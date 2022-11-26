import Block from '../../utils/Block';
import template from './registration.hbs';
import './registration.scss';
import Button from '../../components/button';
import Link from '../../components/link';
import Input from '../../components/input';
import Header from '../../components/form/header';
import Content from './components/content';
import Footer from '../../components/form/footer';
import EntryField from '../../components/entryField';
import createPage from '../../index';
import { PagesName } from '../const';
import regexpTest from '../../utils/regexpTest';
import { RegexpName } from '../../const';

type TRegistrationPageProps = {
  header: Header
  content: Content,
  footer: Footer
};

export default class RegistrationPage extends Block<TRegistrationPageProps> {
  private email: string = '';
  private login: string = '';
  private firstName: string = '';
  private secondName: string = '';
  private phone: string = '';
  private passwordOne: string = '';
  private passwordTwo: string = '';

  protected blurHandler(elem: EntryField, regexp: RegexpName, value: string) {
    if (!value) {
      elem.removeClass('focus');
    }
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
      events: {
        input: () => {
          this.email = inputEmail.value;
        },
        focus: () => {
          email.addClass('focus');
          email.removeClass('error');
        },
        blur: () => {
          this.blurHandler(email, RegexpName.Email, this.email);
        },
      },
    });

    const email = new EntryField({
      label: 'Почта',
      error: 'Неверный email',
      input: inputEmail,
    });

    const inputLogin = new Input({
      type: 'text',
      name: 'login',
      events: {
        input: () => {
          this.login = inputLogin.value;
        },
        focus: () => {
          login.addClass('focus');
          login.removeClass('error');
        },
        blur: () => {
          this.blurHandler(login, RegexpName.Login, this.login);
        },
      },
    });

    const login = new EntryField({
      label: 'Логин',
      error: 'Неверный логин',
      input: inputLogin,
    });

    const inputFirstName = new Input({
      type: 'text',
      name: 'first_name',
      events: {
        input: () => {
          this.firstName = inputFirstName.value;
        },
        focus: () => {
          firstName.addClass('focus');
          firstName.removeClass('error');
        },
        blur: () => {
          this.blurHandler(firstName, RegexpName.FirstName, this.firstName);
        },
      },
    });

    const firstName = new EntryField({
      label: 'Почта',
      error: 'Неверный имя',
      input: inputFirstName,
    });

    const inputSecondName = new Input({
      type: 'text',
      name: 'first_name',
      events: {
        input: () => {
          this.secondName = inputSecondName.value;
        },
        focus: () => {
          secondName.addClass('focus');
          secondName.removeClass('error');
        },
        blur: () => {
          this.blurHandler(secondName, RegexpName.SecondName, this.secondName);
        },
      },
    });

    const secondName = new EntryField({
      label: 'Фамилия',
      error: 'Неверный фамилия',
      input: inputSecondName,
    });

    const inputPhone = new Input({
      type: 'text',
      name: 'phone',
      events: {
        input: () => {
          this.phone = inputPhone.value;
        },
        focus: () => {
          phone.addClass('focus');
          phone.removeClass('error');
        },
        blur: () => {
          this.blurHandler(phone, RegexpName.Phone, this.phone);
        },
      },
    });

    const phone = new EntryField({
      label: 'Телефон',
      error: 'Неверный телефон',
      input: inputPhone,
    });

    const inputPasswordOne = new Input({
      type: 'password',
      name: 'password',
      events: {
        input: () => {
          this.passwordOne = inputPasswordOne.value;
        },
        focus: () => {
          passwordOne.addClass('focus');
          passwordOne.removeClass('error');
        },
        blur: () => {
          this.blurHandler(passwordOne, RegexpName.Password, this.passwordOne);
        },
      },
    });

    const passwordOne = new EntryField({
      label: 'Пароль',
      error: 'Неверный пароль',
      input: inputPasswordOne,
    });

    const inputPasswordTwo = new Input({
      type: 'password',
      name: 'password',
      events: {
        input: () => {
          this.passwordOne = inputPasswordTwo.value;
        },
        focus: () => {
          passwordTwo.addClass('focus');
          passwordTwo.removeClass('error');
        },
        blur: () => {
          this.blurHandler(passwordTwo, RegexpName.Password, this.passwordTwo);
        },
      },
    });

    const passwordTwo = new EntryField({
      label: 'Пароль (еще раз)',
      error: 'Пароли не совпадают',
      input: inputPasswordTwo,
    });

    const button = new Button({
      label: 'Зарегистрироваться',
      events: {
        click: (event) => {
          event.preventDefault();
          let result = false;
          if (!regexpTest(RegexpName.Email, this.email)) {
            email.addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.Login, this.login)) {
            login.addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.FirstName, this.firstName)) {
            firstName.addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.SecondName, this.secondName)) {
            secondName.addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.Phone, this.phone)) {
            phone.addClass('error');
            result = true;
          }
          if (this.passwordOne !== this.passwordTwo) {
            passwordOne.addClass('error');
            passwordTwo.addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.Password, this.passwordOne)) {
            passwordOne.addClass('error');
            result = true;
          }
          if (result) return;
          console.log({
            email: this.email,
            login: this.login,
            first_name: this.firstName,
            second_name: this.secondName,
            phone: this.phone,
            password: this.passwordOne,
          });
        },
      },
    });

    const link = new Link({
      text: 'Войти',
      events: {
        click: () => createPage(PagesName.Authorization),
      },
    });

    this.children.header = new Header({ label: 'Регистрация' });
    this.children.content = new Content({
      email,
      login,
      firstName,
      secondName,
      phone,
      passwordOne,
      passwordTwo,
    });
    this.children.footer = new Footer({ button, link });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
