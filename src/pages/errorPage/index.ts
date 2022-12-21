import Block from '../../utils/Block';
import template from './errorPage.hbs';
import './errorPage.scss';
import Link from '../../components/link';
import Routes from '../const';

export default class ErrorPage extends Block {
  protected init() {
    this.children.toBackLink = new Link({
      text: 'Назад к чатам',
      route: Routes.Messenger,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
