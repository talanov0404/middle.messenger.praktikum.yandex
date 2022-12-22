import Block, { IBlock } from '../../utils/Block';
import template from './registration.hbs';
import './registration.scss';
import Button from '../../components/button';
import Link from '../../components/link';
import Header from '../../components/form/header';
import Content from './components/content';
import Footer from '../../components/form/footer';
import AuthController from '../../controllers/AuthController';
import Routes from '../const';

interface IRegistrationPageProps extends IBlock {
  header: Header
  content: Content,
  footer: Footer
}

export default class RegistrationPage extends Block<IRegistrationPageProps> {
  protected init() {
    const button = new Button({
      label: 'Зарегистрироваться',
      events: {
        click: async (event) => {
          event.preventDefault();

          const { data } = this.children.content as Content;
          if (!(this.children.content as Content).isValid) return;

          await AuthController.signup(data);
        },
      },
    });

    const link = new Link({
      text: 'Войти',
      route: Routes.Authorization,
    });

    this.children.header = new Header({ label: 'Регистрация' });
    this.children.content = new Content();
    this.children.footer = new Footer({ button, link });
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}
