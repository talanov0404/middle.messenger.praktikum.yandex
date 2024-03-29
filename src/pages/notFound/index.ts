import { Block, IBlock } from '../../utils/Block';
import template from './notFound.hbs';
import './notFound.scss';
import Link from '../../components/link';
import Routes from '../const';

interface INotFoundPageProps extends IBlock {
  toBackLink: typeof Link,
}

export default class NotFoundPage extends Block<INotFoundPageProps> {
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
