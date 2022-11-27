import Block from '../../../../utils/Block';
import template from './formEditData.hbs';
import './formEditData.scss';
import EntryField from '../../../../components/entryField';
import { RegexpName } from '../../../../const';
import regexpTest from '../../../../utils/regexpTest';
import Input from '../../../../components/input';
import Button from '../../../../components/button';

type TFormEditDataProps = {
  email: string,
  login: string,
  firstName: string,
  secondName: string,
  displayName: string,
  phone: string,
  handlerSaveButton: (data: Record<string, string>) => void,
};

export default class FormEditData extends Block<TFormEditDataProps> {
  public email: string = this.props.email;
  public login: string = this.props.login;
  public firstName: string = this.props.firstName;
  public secondName: string = this.props.secondName;
  public displayName: string = this.props.displayName;
  public phone: string = this.props.phone;

  protected blurHandler(elem: EntryField, regexp: RegexpName, value: string) {
    elem.removeClass('focus');
    if (!regexpTest(regexp, value)) {
      elem.addClass('error');
    } else {
      elem.removeClass('error');
    }
  }

  protected init() {
    const inputEmail = new Input({
      type: 'email',
      name: 'email',
      value: this.props.email,
      events: {
        input: () => {
          this.email = inputEmail.value;
        },
        focus: () => {
          (this.children.email as EntryField).addClass('focus');
          (this.children.email as EntryField).removeClass('error');
        },
        blur: () => {
          this.blurHandler(this.children.email as EntryField, RegexpName.Email, this.email);
        },
      },
    });

    this.children.email = new EntryField({
      label: 'Почта',
      error: 'Неверный email',
      input: inputEmail,
    });

    const inputLogin = new Input({
      type: 'text',
      name: 'login',
      value: this.props.login,
      events: {
        input: () => {
          this.login = inputLogin.value;
        },
        focus: () => {
          (this.children.login as EntryField).addClass('focus');
          (this.children.login as EntryField).removeClass('error');
        },
        blur: () => {
          this.blurHandler(this.children.login as EntryField, RegexpName.Login, this.login);
        },
      },
    });

    this.children.login = new EntryField({
      label: 'Логин',
      error: 'Неверный логин',
      input: inputLogin,
    });

    const inputFirstName = new Input({
      type: 'text',
      name: 'first_name',
      value: this.props.firstName,
      events: {
        input: () => {
          this.firstName = inputFirstName.value;
        },
        focus: () => {
          (this.children.firstName as EntryField).addClass('focus');
          (this.children.firstName as EntryField).removeClass('error');
        },
        blur: () => {
          this.blurHandler(
            this.children.firstName as EntryField,
            RegexpName.FirstName,
            this.firstName,
          );
        },
      },
    });

    this.children.firstName = new EntryField({
      label: 'Имя',
      error: 'Неверное имя',
      input: inputFirstName,
    });

    const inputSecondName = new Input({
      type: 'text',
      name: 'second_name',
      value: this.props.secondName,
      events: {
        input: () => {
          this.secondName = inputSecondName.value;
        },
        focus: () => {
          (this.children.secondName as EntryField).addClass('focus');
          (this.children.secondName as EntryField).removeClass('error');
        },
        blur: () => {
          this.blurHandler(
            this.children.secondName as EntryField,
            RegexpName.SecondName,
            this.secondName,
          );
        },
      },
    });

    this.children.secondName = new EntryField({
      label: 'Фамилия',
      error: 'Неверная фамилия',
      input: inputSecondName,
    });

    const inputDisplayName = new Input({
      type: 'text',
      name: 'display_name',
      value: this.props.displayName,
      events: {
        input: () => {
          this.displayName = inputDisplayName.value;
        },
        focus: () => {
          (this.children.displayName as EntryField).addClass('focus');
          (this.children.displayName as EntryField).removeClass('error');
        },
        blur: () => {
          this.blurHandler(
            this.children.displayName as EntryField,
            RegexpName.SecondName,
            this.displayName,
          );
        },
      },
    });

    this.children.displayName = new EntryField({
      label: 'Имя в чате',
      error: 'Неверное имя',
      input: inputDisplayName,
    });

    const inputPhone = new Input({
      type: 'text',
      name: 'phone',
      value: this.props.phone,
      events: {
        input: () => {
          this.phone = inputPhone.value;
        },
        focus: () => {
          (this.children.phone as EntryField).addClass('focus');
          (this.children.phone as EntryField).removeClass('error');
        },
        blur: () => {
          this.blurHandler(this.children.phone as EntryField, RegexpName.Phone, this.phone);
        },
      },
    });

    this.children.phone = new EntryField({
      label: 'Телефон',
      error: 'Неверный телефон',
      input: inputPhone,
    });

    this.children.button = new Button({
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          let result = false;
          if (!regexpTest(RegexpName.Email, this.email)) {
            (this.children.email as EntryField).addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.Login, this.login)) {
            (this.children.login as EntryField).addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.FirstName, this.firstName)) {
            (this.children.firstName as EntryField).addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.SecondName, this.secondName)) {
            (this.children.secondName as EntryField).addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.SecondName, this.secondName)) {
            (this.children.displayName as EntryField).addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.Phone, this.phone)) {
            (this.children.phone as EntryField).addClass('error');
            result = true;
          }
          if (result) return;
          this.props.handlerSaveButton({
            email: this.email,
            login: this.login,
            firstName: this.firstName,
            secondName: this.secondName,
            displayName: this.displayName,
            phone: this.phone,
          });
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
