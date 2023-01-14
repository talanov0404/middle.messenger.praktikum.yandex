import { Block, IBlock } from '../../../../utils/Block';
import template from './profileData.hbs';
import './profileData.scss';
import ProfileField from './components/profileField';
import withStore from '../../../../hocs/withStore';

interface IProfileDataProps extends IBlock {
  email: ProfileField,
  login: ProfileField,
  firstName: ProfileField,
  secondName: ProfileField,
  displayName: ProfileField,
  phone: ProfileField,
}

class ProfileDataBase extends Block {
  protected init() {
    this.createChildren();
  }

  protected componentDidUpdate(oldProps: IProfileDataProps, newProps: IProfileDataProps): boolean {
    this.createChildren();

    return oldProps !== newProps;
  }

  private createChildren() {
    this.children.email = new ProfileField({
      name: 'Почта',
      value: this.props.email,
    });

    this.children.login = new ProfileField({
      name: 'Логин',
      value: this.props.login,
    });

    this.children.firstName = new ProfileField({
      name: 'Имя',
      value: this.props.first_name,
    });

    this.children.secondName = new ProfileField({
      name: 'Фамилия',
      value: this.props.second_name,
    });

    this.children.displayName = new ProfileField({
      name: 'Имя в чате',
      value: this.props.display_name,
    });

    this.children.phone = new ProfileField({
      name: 'Телефон',
      value: this.props.phone,
    });
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}

const withData = withStore((state) => ({ ...state.user.data } || {}));
const ProfileData = withData(ProfileDataBase as typeof Block);
export default ProfileData;
