import Block, { IBlock } from '../../../../utils/Block';
import template from './profileData.hbs';
import './profileData.scss';
import ProfileField from './components/profileField';

interface IProfileDataProps extends IBlock {
  email: string,
  login: string,
  firstName: string,
  secondName: string,
  displayName: string,
  phone: string,
};

export default class ProfileData extends Block<IProfileDataProps> {
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
      value: this.props.firstName,
    });

    this.children.secondName = new ProfileField({
      name: 'Фамилия',
      value: this.props.secondName,
    });

    this.children.displayName = new ProfileField({
      name: 'Имя в чате',
      value: this.props.displayName,
    });

    this.children.phone = new ProfileField({
      name: 'Телефон',
      value: this.props.phone,
    });
  }

  render() {
    this.children.email.setProps({ ...this.children.email, value: this.props.email });
    this.children.login.setProps({ ...this.children.login, value: this.props.login });
    this.children.firstName.setProps({ ...this.children.firstName, value: this.props.firstName });
    this.children.secondName.setProps({ ...this.children.secondName, value: this.props.secondName });
    this.children.displayName.setProps({ ...this.children.displayName, value: this.props.displayName });
    this.children.phone.setProps({ ...this.children.email, phone: this.props.phone });
    return this.compile(template, { ...this.props });
  }
}