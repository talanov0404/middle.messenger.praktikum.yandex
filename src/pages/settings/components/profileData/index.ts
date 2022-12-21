import Block from '../../../../utils/Block';
import template from './profileData.hbs';
import './profileData.scss';
import ProfileField from './components/profileField';
import withStore from '../../../../hocs/withStore';
import Input from '../../../../components/input';

class ProfileDataBase extends Block {
  protected init() {
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

  render() {
    (this.children.email as Input).setProps({ ...this.props, value: this.props.email });
    (this.children.login as Input).setProps({ ...this.props, value: this.props.login });
    (this.children.firstName as Input).setProps({ ...this.props, value: this.props.first_name });
    (this.children.secondName as Input).setProps({ ...this.props, value: this.props.second_name });
    (this.children.displayName as Input)
      .setProps({ ...this.props, value: this.props.display_name });
    (this.children.phone as Input).setProps({ ...this.props, value: this.props.phone });
    return this.compile(template, { ...this.props });
  }
}

const withData = withStore((state) => ({ ...state.user.data } || {}));
const ProfileData = withData(ProfileDataBase);
export default ProfileData;
