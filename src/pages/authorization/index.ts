import Block, { IBlock } from '../../utils/Block';
import template from './authorization.hbs';
import './authorization.scss';
import Button from '../../components/button';
import Link from '../../components/link';
import Header from '../../components/form/header';
import Content from './components/content';
import Footer from '../../components/form/footer';
import AuthController from '../../controllers/AuthController';
import Routes from '../const';

interface IAuthorizationPageProps extends IBlock {
  header: Header,
  content: Content,
  footer: Footer
}

export default class AuthorizationPage extends Block<IAuthorizationPageProps> {
  protected init() {
    const button = new Button({
      label: 'Войти',
      events: {
        click: (event) => {
          event.preventDefault();

          const { data } = this.children.content as Content;
          const result = (this.children.content as Content).isValid;
          if (!result) return;

          AuthController.signin(data);
        },
      },
    });

    const link = new Link({
      text: 'Нет аккаунта?',
      route: Routes.Registrations,
    });

    this.children.header = new Header({ label: 'Вход' });
    this.children.content = new Content({});
    this.children.footer = new Footer({ link, button });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
