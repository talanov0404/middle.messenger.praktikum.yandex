import Block from '../../utils/Block';
import template from './notFound.hbs';
import './notFound.scss';

type TNotFoundPageProps = {
};

export default class NotFoundPage extends Block<TNotFoundPageProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
