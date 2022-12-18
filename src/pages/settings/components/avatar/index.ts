import Block from '../../../../utils/Block';
import template from './avatar.hbs';
import './avatar.scss';
import Modal from '../../../../components/modal';
import ModalContent from './components/modalContent';
import UsersController from '../../../../controllers/UsersController';
import ResourcesController from '../../../../controllers/ResourcesController';

interface IAvatarProps {
  avatar?: string;
  events?: {
    click: () => void;
  },
  edit?: boolean
}

export default class Avatar extends Block {
  constructor(props: IAvatarProps) {
    const updateProps = { ...props, events: { ...props.events } };
    updateProps.events.click = () => {
      this.setProps({ ...this.props, edit: true });
    };
    super(updateProps);
  }

  protected init() {
    if (this.props.avatar) {
      ResourcesController.fetchData(this.props.avatar);
    }

    const modalContent = new ModalContent({
      handler: () => {
        if (modalContent.fileName) {
          (this.children.modal as Block).setProps({ error: '' });
        }
      },
    });

    this.children.modal = new Modal({
      name: 'Загрузите файл',
      content: modalContent,
      buttonLabel: 'Поменять',
      handlerCancel: () => {
        modalContent.clear();
        this.setProps({ edit: false });
      },
      handlerApply: () => {
        if (!modalContent.fileName) {
          (this.children.modal as Block).setProps({ error: 'Нужно выбрать файл' });
        } else {
          const { formData } = modalContent;
          if (formData) {
            UsersController.avatar(formData);
            this.setProps({ edit: false });
            modalContent.clear();
          }
        }
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
