import Block from '../../utils/Block';
import template from './errorPage.hbs';
import './errorPage.scss';

type TErrorPageProps = {
};

export default class ErrorPage extends Block<TErrorPageProps> {
  render() {
    return this.compile(template, { ...this.props });
  }
}
