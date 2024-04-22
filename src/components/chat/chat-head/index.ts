import './index.styl';
import Block from '../../../tools/Block.ts';
import {store, StoreEvents} from '../../../store';
import {ChatAvatar} from '../chat-avatar';
import {EventButton} from '../../event-button';
import {chatApiController} from '../../../controllers/ChatController.ts';
import {Modal} from '../../modal';
import {ChatAddUser} from '../chat-add-user';
import {ChatDeleteUser} from '../chat-delete-user';

const template = `
<div class="chat-head">
  <div class="chat-head__avatar">
    {{{ ChatAvatarImage }}}
    {{{ ChatTitle }}}
  </div>
  <div class="chat-head__controls">
    {{{ AddUser }}}
    {{#if admin}}
      {{{ DeleteUser }}}
      {{{ DeleteChat }}}
    {{/if}}
  </div>
  {{{ ModalAddUser }}}
  {{{ ModalDeleteUser }}}
</div>
`;

export class ChatHead extends Block {
  constructor() {
    super({

      admin: store.getState().chat.created_by === store.getState().user.id,

      ChatAvatarImage: new ChatAvatar({
        src: store.getState().chat.avatar,
      }),

      ChatTitle: store.getState().chat.title,

      ModalAddUser: new Modal({
        modalName: 'modal-add-user',
        content: new ChatAddUser(),
      }),

      AddUser: new EventButton({
        label: 'Добавить юзера',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            store.set({modal: 'modal-add-user'});
          }
        }
      }),

      ModalDeleteUser: new Modal({
        modalName: 'modal-delete-user',
        content: new ChatDeleteUser(),
      }),

      DeleteUser: new EventButton({
        label: 'Удалить юзера',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            store.set({modal: 'modal-delete-user'});
          }
        }
      }),

      DeleteChat: new EventButton({
        label: 'Удалить чат',
        events: {
          click: async (event: MouseEvent) => {
            event.preventDefault();
            const formData = {
              chatId: store.getState().chat.id
            };
            await chatApiController.deleteChat(formData);
          }
        }
      }),
    });
  }

  componentDidMount() {
    super.componentDidMount();

    store.on(StoreEvents.Updated, () => {
      this.children.ChatAvatarImage.setProps({src: store.getState().chat.avatar});
      this.setProps({ChatTitle: store.getState().chat.title, admin: store.getState().chat.created_by === store.getState().user.id});
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
