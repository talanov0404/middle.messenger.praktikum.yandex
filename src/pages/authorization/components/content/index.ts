import Block from '../../../../utils/Block';
import template from './content.hbs';
import EntryField from '../../../../components/entryField';
import Input from '../../../../components/input';
import { SigninData } from '../../../../types/interfaces';
import { Regexp } from '../../../../const';
import validate from '../../../../utils/validate';

export default class Content extends Block {
  public get data(): SigninData {
    const values = Object
      .values(this.children)
      .filter((child) => child instanceof EntryField)
      .map((child) => ([(child as EntryField).name, (child as Input).value]));

    return Object.fromEntries(values);
  }

  public get isValid() {
    const entryFields = Object.values(this.children)
      .filter((child) => (child instanceof EntryField)) as [EntryField];

    return validate(entryFields);
  }

  protected init() {
    this.children.login = new EntryField({
      name: 'login',
      label: 'Логин',
      regexp: Regexp.login,
      error: 'Неверный логин',
    });

    this.children.password = new EntryField({
      type: 'password',
      name: 'password',
      regexp: Regexp.password,
      label: 'Пароль',
      error: 'Неверный пароль',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
