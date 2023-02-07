import { Block, IBlock } from '../../utils/Block';
import template from './loader.hbs';
import './loader.scss';

interface ILoaderProps extends IBlock {
  text?: string,
}

export default class Loader extends Block<ILoaderProps> {
  protected render() {
    return this.compile(template, { ...this.props });
  }
}
