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
import router from '../../utils/Router';
import Routes from '../const';
import Loader from '../../components/loader';

class SettingsPageBase extends Block {
  protected init() {
    this.children.loader = new Loader();

    this.children.buttonBack = new Button({
      src: arrowLeft,
      events: {
        click: () => router.go(Routes.Messenger),
      },
    });

    this.children.profileData = new ProfileData({});

    this.children.editFormData = new FormEditData({
      handlerSaveButton: () => {
        this.setProps({ editData: false });
      },
    });

    this.children.editFormPassword = new FormEditPassword({
      handlerSaveButton: () => {
        this.setProps({ editPassword: false });
      },
    });

    this.children.header = new Header({
      avatar: this.props.data?.avatar,
      name: this.props.data?.first_name,
    });

    this.children.footer = new Footer({
      handlerEditData: () => this.setProps({ editData: true }),
      handlerEditPassword: () => this.setProps({ editPassword: true }),
    });
  }

  render() {
    (this.children.header as Header).setProps({ ...this.props, avatar: this.props.data.avatar });
    return this.compile(template, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.user } || { isLoading: true }));
export default withUser(SettingsPageBase);
