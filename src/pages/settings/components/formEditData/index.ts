import Block from '../../../../utils/Block';
import template from './formEditData.hbs';
import './formEditData.scss';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import EntryField from '../../../../components/entryField';
import { Regexp } from '../../../../const';
import validate from '../../../../utils/validate';
import withStore from '../../../../hocs/withStore';
import UsersController from '../../../../controllers/UsersController';

class FormEditDataBase extends Block {
  protected init() {
    this.children.email = new EntryField({
      type: 'email',
      name: 'email',
      value: this.props.email,
      regexp: Regexp.email,
      label: 'Почта',
      error: 'Неверный email',
    });

    this.children.login = new EntryField({
      name: 'login',
      value: this.props.login,
      regexp: Regexp.login,
      label: 'Логин',
      error: 'Неверный логин',
    });

    this.children.firstName = new EntryField({
      name: 'first_name',
      value: this.props.first_name,
      regexp: Regexp.first_name,
      label: 'Имя',
      error: 'Неверное имя',
    });

    this.children.secondName = new EntryField({
      name: 'second_name',
      value: this.props.second_name,
      regexp: Regexp.second_name,
      label: 'Фамилия',
      error: 'Неверная фамилия',
    });

    this.children.displayName = new EntryField({
      name: 'display_name',
      value: this.props.display_name,
      regexp: Regexp.display_name,
      label: 'Имя в чате',
      error: 'Неверное имя',
    });

    this.children.phone = new EntryField({
      name: 'phone',
      value: this.props.phone,
      regexp: Regexp.phone,
      label: 'Телефон',
      error: 'Неверный телефон',
    });

    this.children.button = new Button({
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();

          const entryFields = Object.values(this.children)
            .filter((child) => (child instanceof EntryField)) as [EntryField];

          const result = validate(entryFields);
          if (!result) return;

          this.props.handlerSaveButton();

          const values = Object
            .values(this.children)
            .filter((child) => child instanceof EntryField)
            .map((child) => ([(child as EntryField).name, (child as Input).value]));

          const data = Object.fromEntries(values);

          UsersController.profile(data);
        },
      },
    });
  }

  render() {
    this.children.email.setProps({ value: this.props.email });
    this.children.login.setProps({ value: this.props.login });
    this.children.firstName.setProps({ value: this.props.first_name });
    this.children.secondName.setProps({ value: this.props.second_name });
    this.children.displayName.setProps({ value: this.props.display_name });
    this.children.phone.setProps({ value: this.props.phone });
    return this.compile(template, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.user.data } || {}));
const FormEditData = withUser(FormEditDataBase);
export default FormEditData;
