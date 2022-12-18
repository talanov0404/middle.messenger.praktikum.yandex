import Block, { IBlock } from '../../../../../../utils/Block';
import template from './modalContent.hbs';
import './modalContent.scss';
import Button from '../../../../../../components/button';

interface IModalContent extends IBlock {
  handler: () => void,
  events?: {
    submit: () => void,
  },
}

export default class ModalContent extends Block {
  private readonly input: HTMLInputElement;

  constructor(props: IModalContent) {
    super(props);

    this.input = document.createElement('input');
    this.input.type = 'file';
    this.input.accept = 'image/*';
    this.input.onchange = () => {
      const file = this.input?.files?.[0];
      if (file) {
        this.setProps({ fileName: file.name });
        this.props.handler();
      }
    };
  }

  public get formData(): FormData | null {
    if (this.input.files && this.input.files.length > 0) {
      const file = this.input.files[0];
      const formData = new FormData();
      formData.set('avatar', file, file.name);
      return formData;
    }
    return null;
  }

  public get fileName() {
    return this.props.fileName;
  }

  public clear() {
    this.setProps({ fileName: null });
    this.input.value = '';
  }

  protected init() {
    this.children.button = new Button({
      label: 'Выбрать файл на компьютере',
      events: {
        click: (event) => {
          event.preventDefault();
          if (this.input) {
            this.input.value = '';
            this.input.click();
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
