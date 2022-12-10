import Block from '../../utils/Block';
import template from './settings.hbs';
import './settings.scss';
import Button from '../../components/button';
import arrowLeft from '../../../static/arrow-left.svg';
import ProfileData from './components/profileData';
import Footer from './components/footer';
import Header from './components/header';
import FormEditData from './components/formEditData';
import FormEditPassword from './components/formEditPassword';
import withStore from '../../hocs/withStore';
import AuthController from '../../controllers/AuthController';
import router from '../../utils/Router';
import Routes from '../const';
import Loader from '../../components/loader';

class SettingsPageBase extends Block {
  protected init() {
    AuthController.fetchUser();

    this.children.loader = new Loader();

    this.children.buttonBack = new Button({
      src: arrowLeft,
      events: {
        click: () => router.go(Routes.Messenger),
      },
    });

    this.children.profileData = new ProfileData({
      email: this.props.data.email,
      login: this.props.data.login,
      firstName: this.props.data.first_name,
      secondName: this.props.data.second_name,
      displayName: this.props.data.display_name,
      phone: this.props.data.phone,
    });

    this.children.editFormData = new FormEditData({
      email: this.props.data.email,
      login: this.props.data.login,
      firstName: this.props.data.first_name,
      secondName: this.props.data.second_name,
      displayName: this.props.data.display_name,
      phone: this.props.data.phone,
      handlerSaveButton: (data) => {
        this.setProps({ ...this.props, editData: false });
        this.children.profileData.setProps({ ...data });
        console.log(data);
      },
    });

    this.children.editFormPassword = new FormEditPassword({
      password: this.props.data.password,
      handlerSaveButton: (data) => {
        this.setProps({ ...this.props, editPassword: false });
        console.log(data);
      },
    });

    this.children.header = new Header({
      name: this.props.data.first_name,
    });

    this.children.footer = new Footer({
      handlerEditData: () => this.setProps({ ...this.props, editData: true }),
      handlerEditPassword: () => this.setProps({ ...this.props, editPassword: true }),
    });
  }

  render() {
    console.log(JSON.stringify(this.props));
    return this.compile(template, { ...this.props });
  }
}

const withUser = withStore((state) => state.user || { isLoading: true });
export default withUser(SettingsPageBase);
