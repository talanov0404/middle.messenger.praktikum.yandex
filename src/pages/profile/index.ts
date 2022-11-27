import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import Button from '../../components/button';
import createPage from '../../index';
import { PagesName } from '../const';
import arrowLeft from '../../../static/arrow-left.svg';
import ProfileData from './components/profileData';
import Footer from './components/footer';
import Header from './components/header';
import FormEditData from './components/formEditData';
import FormEditPassword from './components/formEditPassword';

const profileData = require('./profile.json');

type TProfilePageProps = {
  editData: boolean,
  editPassword: boolean,
};

export default class ProfilePage extends Block<TProfilePageProps> {
  private email: string = profileData.email;
  private login: string = profileData.login;
  private firstName: string = profileData.firstName;
  private secondName: string = profileData.secondName;
  private displayName: string = profileData.displayName;
  private phone: string = profileData.phone;
  private password: string = profileData.password;

  protected init() {
    this.children.buttonBack = new Button({
      src: arrowLeft,
      events: {
        click: () => createPage(PagesName.Chats),
      },
    });

    this.children.profileData = new ProfileData({
      email: profileData.email,
      login: profileData.login,
      firstName: profileData.firstName,
      secondName: profileData.secondName,
      displayName: profileData.displayName,
      phone: profileData.phone,
    });

    this.children.editFormData = new FormEditData({
      email: profileData.email,
      login: profileData.login,
      firstName: profileData.firstName,
      secondName: profileData.secondName,
      displayName: profileData.displayName,
      phone: profileData.phone,
      handlerSaveButton: (data) => {
        this.email = data.email;
        this.login = data.login;
        this.firstName = data.firstName;
        this.secondName = data.secondName;
        this.displayName = data.displayName;
        this.phone = data.phone;
        this.setProps({ ...this.props, editData: false });
        this.children.profileData.setProps({ ...data });
        console.log(data);
      },
    });

    this.children.editFormPassword = new FormEditPassword({
      password: profileData.password,
      handlerSaveButton: (data) => {
        this.password = data.password;
        this.setProps({ ...this.props, editPassword: false });
        console.log(data);
      },
    });

    this.children.header = new Header({
      name: profileData.firstName,
    });

    this.children.footer = new Footer({
      handlerEditData: () => this.setProps({ ...this.props, editData: true }),
      handlerEditPassword: () => this.setProps({ ...this.props, editPassword: true }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
