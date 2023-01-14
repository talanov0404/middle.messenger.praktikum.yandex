import { Block, IBlock } from '../../../../utils/Block';
import template from './content.hbs';
import EntryField from '../../../../components/entryField';
import Input from '../../../../components/input';
import { SignupData } from '../../../../types/interfaces';
import { Regexp } from '../../../../const';
import validate from '../../../../utils/validate';

interface IContentProps extends IBlock {
  email: EntryField,
  login: EntryField
  firstName: EntryField,
  secondName: EntryField
  phone: EntryField,
  passwordOne: EntryField,
  passwordTwo: EntryField,
}

export default class Content extends Block<IContentProps> {
  public get data(): SignupData {
    const values = Object
      .values(this.children)
      .filter((child) => child instanceof EntryField)
      .map((child) => ([(child as EntryField).name, (child as Input).value]));

    return Object.fromEntries(values);
  }

  public get isValid() {
    const entryFields = Object.values(this.children)
      .filter((child) => (child instanceof EntryField)) as [EntryField];

    const passwordOne = this.children.passwordOne as EntryField;
    const passwordTwo = this.children.passwordTwo as EntryField;

    let result = validate(entryFields);

    if (passwordOne.value !== passwordTwo.value) {
      passwordOne.addClass('error');
      passwordTwo.addClass('error');
      result = false;
    }

    return result;
  }

  protected init() {
    this.children.email = new EntryField({
      type: 'email',
      name: 'email',
      label: 'Почта',
      regexp: Regexp.email,
      error: 'Неверный email',
    });

    this.children.login = new EntryField({
      name: 'login',
      label: 'Логин',
      regexp: Regexp.login,
      error: 'Неверный логин',
    });

    this.children.firstName = new EntryField({
      name: 'first_name',
      label: 'Имя',
      regexp: Regexp.first_name,
      error: 'Неверное имя',
    });

    this.children.secondName = new EntryField({
      name: 'second_name',
      label: 'Фамилия',
      regexp: Regexp.second_name,
      error: 'Неверная фамилия',
    });

    this.children.phone = new EntryField({
      name: 'phone',
      label: 'Телефон',
      regexp: Regexp.phone,
      error: 'Неверный телефон',
    });

    this.children.passwordOne = new EntryField({
      type: 'password',
      name: 'password',
      label: 'Пароль',
      regexp: Regexp.password,
      error: 'Неверный пароль',
    });

    this.children.passwordTwo = new EntryField({
      type: 'password',
      name: 'password',
      label: 'Пароль (еще раз)',
      regexp: Regexp.password,
      error: 'Пароли не совпадают',
    });
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}
