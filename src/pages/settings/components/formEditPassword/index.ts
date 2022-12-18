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
        click: async (event) => {
          event.preventDefault();

          const entryFields = Object.values(this.children)
            .filter((child) => (child instanceof EntryField)) as [EntryField];

          let result = validate(entryFields);

          const passwordOld = this.children.passwordOld as EntryField;
          const passwordOne = this.children.passwordOne as EntryField;
          const passwordTwo = this.children.passwordTwo as EntryField;

          if (passwordOne.value !== passwordTwo.value) {
            (this.children.passwordTwo as EntryField).addClass('error');
            result = false;
          }

          if (!result) return;

          await UsersController.password({
            oldPassword: passwordOld.value,
            newPassword: passwordOne.value,
          });

          if (this.props.error) {
            (this.children.passwordOld as EntryField).addClass('error');
            return;
          }

          this.props.handlerSaveButton();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.user } || {}));
const FormEditPassword = withUser(FormEditPasswordBase);
export default FormEditPassword;
