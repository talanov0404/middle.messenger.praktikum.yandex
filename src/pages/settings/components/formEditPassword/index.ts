import Block from '../../../../utils/Block';
import template from './formEditPassword.hbs';
import './formEditPassword.scss';
import EntryField from '../../../../components/entryField';
import { RegexpName } from '../../../../const';
import regexpTest from '../../../../utils/regexpTest';
import Input from '../../../../components/input';
import Button from '../../../../components/button';

type TFormEditPasswordProps = {
  password: string,
  handlerSaveButton: (data: Record<string, string>) => void,
};

export default class FormEditPassword extends Block<TFormEditPasswordProps> {
  public password: string = this.props.password;
  public passwordOld: string = '';
  public passwordOne: string = '';
  public passwordTwo: string = '';

  protected blurHandler(elem: EntryField, regexp: RegexpName, value: string) {
    elem.removeClass('focus');
    if (!regexpTest(regexp, value)) {
      elem.addClass('error');
    } else {
      elem.removeClass('error');
    }
  }

  protected init() {
    const inputPasswordOld = new Input({
      type: 'password',
      name: 'password',
      events: {
        input: () => {
          this.passwordOld = inputPasswordOld.value;
        },
        focus: () => {
          (this.children.passwordOld as EntryField).addClass('focus');
          (this.children.passwordOld as EntryField).removeClass('error');
        },
        blur: () => {
          this.blurHandler(
            this.children.passwordOld as EntryField,
            RegexpName.Password,
            this.passwordOld,
          );
        },
      },
    });

    this.children.passwordOld = new EntryField({
      label: 'Старый пароль',
      error: 'Неверный пароль',
      input: inputPasswordOld,
    });

    const inputPasswordOne = new Input({
      type: 'password',
      name: 'password',
      events: {
        input: () => {
          this.passwordOne = inputPasswordOne.value;
        },
        focus: () => {
          (this.children.passwordOne as EntryField).addClass('focus');
          (this.children.passwordOne as EntryField).removeClass('error');
        },
        blur: () => {
          this.blurHandler(
            this.children.passwordOne as EntryField,
            RegexpName.Password,
            this.passwordOne,
          );
        },
      },
    });

    this.children.passwordOne = new EntryField({
      label: 'Пароль',
      error: 'Неверный пароль',
      input: inputPasswordOne,
    });

    const inputPasswordTwo = new Input({
      type: 'password',
      name: 'password',
      events: {
        input: () => {
          this.passwordTwo = inputPasswordTwo.value;
        },
        focus: () => {
          (this.children.passwordTwo as EntryField).addClass('focus');
          (this.children.passwordTwo as EntryField).removeClass('error');
        },
        blur: () => {
          this.blurHandler(
            this.children.passwordTwo as EntryField,
            RegexpName.Password,
            this.passwordTwo,
          );
        },
      },
    });

    this.children.passwordTwo = new EntryField({
      label: 'Пароль (еще раз)',
      error: 'Пароли не совпадают',
      input: inputPasswordTwo,
    });

    this.children.button = new Button({
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          let result = false;
          if (this.passwordOld !== this.password) {
            (this.children.passwordOld as EntryField).addClass('error');
            result = true;
          }
          if (this.passwordOne !== this.passwordTwo) {
            (this.children.passwordOne as EntryField).addClass('error');
            (this.children.passwordTwo as EntryField).addClass('error');
            result = true;
          }
          if (!regexpTest(RegexpName.Password, this.passwordOne)) {
            (this.children.passwordOne as EntryField).addClass('error');
            result = true;
          }
          if (result) return;
          this.props.handlerSaveButton({
            password: this.passwordOne,
          });
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
