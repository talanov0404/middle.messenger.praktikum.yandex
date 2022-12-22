import Block, { IBlock } from '../../utils/Block';
import template from './errorPage.hbs';
import './errorPage.scss';
import Link from '../../components/link';
import Routes from '../const';

interface IErrorPageProps extends IBlock {
  toBackLink: typeof Link,
}

export default class ErrorPage extends Block<IErrorPageProps> {
  protected init() {
    this.children.toBackLink = new Link({
      text: 'Назад к чатам',
      route: Routes.Messenger,
    });
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}
