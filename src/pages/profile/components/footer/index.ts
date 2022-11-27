import Block from '../../../../utils/Block';
import template from './footer.hbs';
import './footer.scss';
import Link from '../../../../components/link';
import createPage from '../../../../index';
import { PagesName } from '../../../const';

type TFooterProps = {
  editData?: Link,
  editPassword?: Link,
  exitProfile?: Link,
  handlerEditData: () => void,
  handlerEditPassword: () => void,
};

export default class Footer extends Block<TFooterProps> {
  protected init() {
    this.children.editData = new Link({
      text: 'Изменить данные',
      events: {
        click: () => this.props.handlerEditData(),
      },
    });
    this.children.editPassword = new Link({
      text: 'Изменить пароль',
      events: {
        click: () => this.props.handlerEditPassword(),
      },
    });
    this.children.exitProfile = new Link({
      text: 'Выйти',
      events: {
        click: () => createPage(PagesName.Authorization),
      },
    });
    this.children.exitProfile.getContent()?.classList.add('link-failed');
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
