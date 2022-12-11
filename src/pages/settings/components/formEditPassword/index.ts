import Block from '../../../../utils/Block';
import template from './formEditPassword.hbs';
import './formEditPassword.scss';
import Button from '../../../../components/button';
import EntryField from '../../../../components/entryField';
import { Regexp } from '../../../../const';
import validate from '../../../../utils/validate';
import withStore from '../../../../hocs/withStore';
import UsersController from '../../../../controllers/UsersController';

class FormEditPasswordBase extends Block {
  protected init() {
    this.children.passwordOld = new EntryField({
      type: 'password',
      name: 'password',
      label: 'Старый пароль',
      regexp: Regexp.password,
      error: 'Неверный пароль',
    });

    this.children.passwordOne = new EntryField({
      type: 'password',
      name: 'password',
      label: 'Пароль',
      regexp: Regexp.password,
      error: 'Неверный пароль',
    });

    this.children.passwordTwo = new EntryField({
      type: 'password',
      name: 'password',
      label: 'Пароль (еще раз)',
      regexp: Regexp.password,
      error: 'Пароли не совпадают',
    });

    this.children.button = new Button({
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          let result = true;

          const entryFields = Object.values(this.children)
            .filter((child) => (child instanceof EntryField)) as [EntryField];

          result = validate(entryFields);

          const passwordOld = this.children.passwordOld as EntryField;
          const passwordOne = this.children.passwordOne as EntryField;
          const passwordTwo = this.children.passwordTwo as EntryField;

          if (passwordOld.value !== this.props.password) {
            (this.children.passwordOld as EntryField).addClass('error');
            result = true;
          }

          if (passwordOne !== passwordTwo) {
            (this.children.passwordOne as EntryField).addClass('error');
            (this.children.passwordTwo as EntryField).addClass('error');
            result = true;
          }

          if (!result) return;

          this.props.handlerSaveButton();

          UsersController.password({
            oldPassword: passwordOld.value,
            newPassword: passwordOne.value,
          });
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.user.data } || {}));
const FormEditPassword = withUser(FormEditPasswordBase);
export default FormEditPassword;
