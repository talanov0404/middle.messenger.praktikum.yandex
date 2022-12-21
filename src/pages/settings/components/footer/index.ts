import Block, { IBlock } from '../../../../utils/Block';
import template from './footer.hbs';
import './footer.scss';
import Button from '../../../../components/button';
import AuthController from '../../../../controllers/AuthController';

interface IFooterProps extends IBlock {
  editData?: Button,
  editPassword?: Button,
  exitProfile?: Button,
  handlerEditData: () => void,
  handlerEditPassword: () => void,
}

export default class Footer extends Block<IFooterProps> {
  protected init() {
    this.children.editData = new Button({
      label: 'Изменить данные',
      events: {
        click: () => this.props.handlerEditData(),
      },
    });
    this.children.editPassword = new Button({
      label: 'Изменить пароль',
      events: {
        click: () => this.props.handlerEditPassword(),
      },
    });
    this.children.exitProfile = new Button({
      label: 'Выйти',
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
    this.children.exitProfile.getContent()?.classList.add('button-logout');
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
