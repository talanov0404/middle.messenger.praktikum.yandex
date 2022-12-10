import Block, { IBlock } from '../../utils/Block';
import template from './authorization.hbs';
import './authorization.scss';
import Button from '../../components/button';
import Link from '../../components/link';
import Input from '../../components/input';
import EntryField from '../../components/entryField';
import Header from '../../components/form/header';
import Content from './components/content';
import Footer from '../../components/form/footer';
import { RegexpName } from '../../const';
import regexpTest from '../../utils/regexpTest';
import AuthController from '../../controllers/AuthController';
import Routes from '../const';

interface IAuthorizationPageProps extends IBlock {
  header: Header,
  content: Content,
  footer: Footer
}

export default class AuthorizationPage extends Block<IAuthorizationPageProps> {
  protected focusHandler(elem: EntryField) {
    elem.addClass('focus');
    elem.removeClass('error');
  }

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
        focus: () => {
          this.focusHandler(login);
        },
        blur: () => {
          this.blurHandler(login, RegexpName.Login, inputLogin.value);
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
        focus: () => {
          this.focusHandler(password);
        },
        blur: () => {
          this.blurHandler(password, RegexpName.Password, inputPassword.value);
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
          if (!regexpTest(RegexpName.Login, inputLogin.value)) {
            login.addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.Password, inputPassword.value)) {
            password.addClass('error');
            result = true;
          }
          if (result) return;

          AuthController.signin({
            login: inputLogin.value,
            password: inputPassword.value,
          });
        },
      },
    });

    const link = new Link({
      text: 'Нет аккаунта?',
      route: Routes.Registrations,
    });

    this.children.header = new Header({ label: 'Вход' });
    this.children.content = new Content({ login, password });
    this.children.footer = new Footer({ link, button });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
