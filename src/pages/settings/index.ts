import Block, { IBlock } from '../../utils/Block';
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
import { User } from '../../types/interfaces';

interface ISettingsPageProps extends IBlock {
  loader: Loader,
  editData: boolean,
  editPassword: boolean,
  data: User,
  buttonBack: Button,
  profileData: typeof ProfileData,
  editFormData: typeof FormEditData,
  editFormPassword: typeof FormEditPassword,
}

class SettingsPageBase extends Block<ISettingsPageProps> {
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
        this.setProps({ ...this.props, editData: false });
      },
    });

    this.children.editFormPassword = new FormEditPassword({
      handlerSaveButton: () => {
        this.setProps({ ...this.props, editPassword: false });
      },
    });

    this.children.header = new Header({
      avatar: this.props.data?.avatar,
      name: this.props.data?.first_name,
    });

    this.children.footer = new Footer({
      handlerEditData: () => this.setProps({ ...this.props, editData: true }),
      handlerEditPassword: () => this.setProps({ ...this.props, editPassword: true }),
    });
  }

  protected componentDidUpdate(oldProps: ISettingsPageProps, newProps: ISettingsPageProps) {
    (this.children.header as Header)
      .setProps({ name: this.props.data.first_name, avatar: this.props.data.avatar });

    return oldProps !== newProps;
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.user } || { isLoading: true }));
export default withUser(SettingsPageBase as typeof Block);
