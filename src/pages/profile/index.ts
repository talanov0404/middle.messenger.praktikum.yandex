import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import Button from '../../components/button';
import createPage from '../../index';
import { PagesName } from '../const';
import arrowLeft from '../../../static/arrow-left.svg';
import ProfileData from './components/profileData';
import Footer from './components/footer';

type TProfilePageProps = {
};

export default class ProfilePage extends Block<TProfilePageProps> {
  private email: string = 'example@yandex.ru';
  private login: string = 'ivanov';
  private firstName: string = 'Иван';
  private secondName: string = 'Иванов';
  private displayName: string = 'Иван';
  private phone: string = '+79999999999';
  private password: string = 'FdsfJ42Fj';

  protected init() {
    this.children.buttonBack = new Button({
      src: arrowLeft,
      events: {
        click: () => createPage(PagesName.Chats),
      },
    });

    this.children.profileData = new ProfileData({
      email: this.email,
      login: this.login,
      firstName: this.firstName,
      secondName: this.secondName,
      displayName: this.displayName,
      phone: this.phone,
    });

    this.children.footer = new Footer({
      handlerEditData: () => console.log('Изменить данные'),
      handlerEditPassword: () => console.log('Изменить пароль'),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
