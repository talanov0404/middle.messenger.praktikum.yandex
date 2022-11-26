import Block from '../../utils/Block';
import template from './authorization.hbs';
import './authorization.scss';
import Button from '../../components/button';
import Link from '../../components/link';
import Input from '../../components/input';
import EntryField from '../../components/entryField';
import Header from '../../components/form/header';
import Content from './components/content';
import Footer from '../../components/form/footer';
import createPage from '../../index';
import { PagesName } from '../const';
import { RegexpName } from '../../const';
import regexpTest from '../../utils/regexpTest';

type TAuthorizationPageProps = {
  header: Header
  content: Content,
  footer: Footer
};

export default class AuthorizationPage extends Block<TAuthorizationPageProps> {
  private login: string = '';
  private password: string = '';

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

    const inputPassword = new Input({
      type: 'password',
      name: 'password',
      events: {
        input: () => {
          this.password = inputPassword.value;
        },
        focus: () => {
          password.addClass('focus');
          password.removeClass('error');
        },
        blur: () => {
          this.blurHandler(password, RegexpName.Password, this.password);
        },
      },
    });

    const password = new EntryField({
      label: 'Пароль',
      error: 'Неверный пароль',
      input: inputPassword,
    });

    const button = new Button({
      label: 'Войти',
      events: {
        click: (event) => {
          event.preventDefault();
          let result = false;
          if (!regexpTest(RegexpName.Login, this.login)) {
            login.addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.Password, this.password)) {
            password.removeClass('error');
            result = true;
          }
          if (result) return;
          console.log({
            login: this.login,
            password: this.password,
          });
          createPage(PagesName.Chats);
        },
      },
    });

    const link = new Link({
      text: 'Нет аккаунта?',
      events: {
        click: () => createPage(PagesName.Registrations),
      },
    });

    this.children.header = new Header({ label: 'Вход' });
    this.children.content = new Content({ login, password });
    this.children.footer = new Footer({ button, link });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
