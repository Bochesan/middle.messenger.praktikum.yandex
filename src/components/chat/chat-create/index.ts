import './index.styl';
import Block from '../../../tools/Block.ts';
import {store, StoreEvents} from '../../../store';
import {Modal} from '../../modal';
import {ChatCreateForm} from '../chat-create-form';

const template = `
<div class="chat-create">
  <div class="chat-create__button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1">
      <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"/>
    </svg>
  </div>
  {{{ ModalCreate }}}
</div>
`;

export class ChatCreate extends Block {
  constructor() {
    super({
      show: false,
      ModalCreate: new Modal({
        modalName: 'modal-create-chat',
        content: new ChatCreateForm(),
      }),

      events: {
        click: {
          element: '.chat-create__button',
          event: (event: MouseEvent) => {
            event.preventDefault();
            const element  = event.target as HTMLInputElement;
            if (element.closest('.chat-create__button')) {
              store.set({modal: 'modal-create-chat'});
            }
          }
        }
      }
    });
  }

  componentDidMount() {
    super.componentDidMount();

    store.on(StoreEvents.Updated, () => {
      this.setProps({show: this.props.modalName === store.getState().modal});
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
