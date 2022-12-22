import Block from '../../../../../../utils/Block';
import template from './menu.hbs';
import './menu.scss';
import Button from '../../../../../../components/button';
import ModalContent from '../modalContent';
import Modal from '../../../../../../components/modal';
import ChatsController from '../../../../../../controllers/ChatsController';
import withStore from '../../../../../../hocs/withStore';
import { ChatInfo } from '../../../../../../types/interfaces';
import UsersController from '../../../../../../controllers/UsersController';

class MenuBase extends Block {
  protected init() {
    this.children.addChat = new Button({
      label: 'Создать чат',
      events: {
        click: (event) => {
          event.preventDefault();
          modalContent.setProps({ removeContent: false, addChat: true });
          (this.children.modal as Block).setProps({
            name: 'Создать чат',
            buttonLabel: 'Создать',
            handlerApply: async () => {
              await ChatsController.create(modalContent.value);
              this.setProps({ activeModal: false });
              this.props.handler();
            },
          });
          this.setProps({ ...this.props, activeModal: true });
        },
      },
    });
    this.children.addChat.getContent()?.classList.add('menu-item');

    this.children.addUser = new Button({
      label: 'Добавить пользователя',
      events: {
        click: (event) => {
          event.preventDefault();
          modalContent.setProps({ removeContent: false, addChat: false });
          (this.children.modal as Block).setProps({
            name: 'Добавить пользователя',
            buttonLabel: 'Добавть',
            handlerApply: async () => {
              const user = await UsersController.search(modalContent.value);
              if (user.length > 0) {
                await ChatsController.addUserToChat(this.props.selectedChat.id, user[0].id);
              }
              this.setProps({ activeModal: false });
              this.props.handler();
            },
          });
          this.setProps({ ...this.props, activeModal: true });
        },
      },
    });
    this.children.addUser.getContent()?.classList.add('menu-item');

    this.children.removeUser = new Button({
      label: 'Удалить пользователя',
      events: {
        click: (event) => {
          event.preventDefault();
          modalContent.setProps({ removeContent: false, addChat: false });
          (this.children.modal as Block).setProps({
            name: 'Удалить пользователя',
            buttonLabel: 'Удалить',
            handlerApply: async () => {
              const user = await UsersController.search(modalContent.value);
              if (user.length > 0) {
                await ChatsController.deleteUserToChat(this.props.selectedChat.id, user[0].id);
              }
              this.setProps({ activeModal: false });
              this.props.handler();
              modalContent.clear();
            },
          });
          this.setProps({ ...this.props, activeModal: true });
        },
      },
    });
    this.children.removeUser.getContent()?.classList.add('menu-item');

    this.children.removeChat = new Button({
      label: 'Удалить чат',
      events: {
        click: (event) => {
          event.preventDefault();
          modalContent.setProps({ removeContent: true });
          (this.children.modal as Block).setProps({
            name: 'Удалить чат',
            buttonLabel: 'Удалить',
            handlerApply: async () => {
              await ChatsController.delete(this.props.selectedChat.id);
              this.setProps({ activeModal: false });
              this.props.handler();
              modalContent.clear();
            },
          });
          this.setProps({ ...this.props, activeModal: true });
        },
      },
    });
    this.children.removeChat.getContent()?.classList.add('menu-item', 'remove-chat');

    const modalContent = new ModalContent({});

    this.children.modal = new Modal({
      name: 'Загрузите файл',
      content: modalContent,
      buttonLabel: 'Прменить',
      handlerCancel: () => {
        this.props.handler();
        this.setProps({ activeModal: false });
        modalContent.clear();
      },
      handlerApply: () => {},
    });
  }

  protected render() {
    return this.compile(template, { ...this.props });
  }
}

const withSelectedChat = withStore((state) => ({
  selectedChat: ((state.chats || []) as ChatInfo[]).find(({ id }) => id === state.selectedChat),
}));

const Menu = withSelectedChat(MenuBase as typeof Block);
export default Menu;
