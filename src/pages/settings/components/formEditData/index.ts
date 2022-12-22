import Block, { IBlock } from '../../../../utils/Block';
import template from './formEditData.hbs';
import './formEditData.scss';
import Button from '../../../../components/button';
import Input from '../../../../components/input';
import EntryField from '../../../../components/entryField';
import { Regexp } from '../../../../const';
import validate from '../../../../utils/validate';
import withStore from '../../../../hocs/withStore';
import UsersController from '../../../../controllers/UsersController';

interface IFormEditDataProps extends IBlock {
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  handlerSaveButton: () => void,
  emailField: EntryField,
  loginField: EntryField,
  firstName: EntryField,
  secondName: EntryField,
  displayName: EntryField,
  phoneField: EntryField,
}

class FormEditDataBase extends Block<IFormEditDataProps> {
  protected init() {
    this.createContent();

    this.children.button = new Button({
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();

          const entryFields = Object.values(this.children)
            .filter((child) => (child instanceof EntryField)) as [EntryField];

          const result = validate(entryFields);
          if (!result) return;

          this.props.handlerSaveButton();

          const values = Object
            .values(this.children)
            .filter((child) => child instanceof EntryField)
            .map((child) => ([(child as EntryField).name, (child as Input).value]));

          const data = Object.fromEntries(values);

          UsersController.profile(data);
        },
      },
    });
  }

  private createContent() {
    this.children.emailField = new EntryField({
      type: 'email',
      name: 'email',
      value: this.props.email,
      regexp: Regexp.email,
      label: 'Почта',
      error: 'Неверный email',
    });

    this.children.loginField = new EntryField({
      name: 'login',
      value: this.props.login,
      regexp: Regexp.login,
      label: 'Логин',
      error: 'Неверный логин',
    });

    this.children.firstName = new EntryField({
      name: 'first_name',
      value: this.props.first_name,
      regexp: Regexp.first_name,
      label: 'Имя',
      error: 'Неверное имя',
    });

    this.children.secondName = new EntryField({
      name: 'second_name',
      value: this.props.second_name,
      regexp: Regexp.second_name,
      label: 'Фамилия',
      error: 'Неверная фамилия',
    });

    this.children.displayName = new EntryField({
      name: 'display_name',
      value: this.props.display_name,
      regexp: Regexp.display_name,
      label: 'Имя в чате',
      error: 'Неверное имя',
    });

    this.children.phoneField = new EntryField({
      name: 'phone',
      value: this.props.phone,
      regexp: Regexp.phone,
      label: 'Телефон',
      error: 'Неверный телефон',
    });
  }

  protected componentDidUpdate(oldProps: IFormEditDataProps, newProps: IFormEditDataProps) {
    this.createContent();

    return oldProps !== newProps;
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.user.data } || {}));
const FormEditData = withUser(FormEditDataBase as typeof Block);
export default FormEditData;
