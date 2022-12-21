import Block, { IBlock } from '../../utils/Block';
import template from './modal.hbs';
import './modal.scss';
import Button from '../button';

interface IModalProps extends IBlock {
  name: string,
  content: Block,
  buttonLabel: string,
  handlerApply: () => void,
  handlerCancel: () => void,
  error?: string,
}

export default class Modal extends Block<IModalProps> {
  constructor(props: IModalProps) {
    const updateProps = { ...props };
    updateProps.events = {
      click: (event: Event) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target && target.closest('.modal')) {
          return;
        }
        this.props.handlerCancel();
        this.getContent()?.remove();
      },
    };
    super(updateProps);
  }

  protected init() {
    this.children.applyButton = new Button({
      label: this.props.buttonLabel,
      events: {
        click: (event) => {
          event.preventDefault();
          this.props.handlerApply();
        },
      },
    });
  }

  protected componentDidUpdate(oldProps: IModalProps, newProps: IModalProps): boolean {
    (this.children.content as Block).setProps({ ...this.props });
    (this.children.applyButton as Button).setProps({ label: this.props.buttonLabel });

    return oldProps !== newProps;
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}
