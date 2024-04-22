import './index.styl';
import Block from '../../../tools/Block.ts';
import {chatApiController} from '../../../controllers/ChatController.ts';
import {TDeleteUsers} from '../../../api/types';
import {store, StoreEvents} from '../../../store';

const template = `
<div class="dialog">
    <form class="form">
      <div class="form__header">{{{ head }}}</div>
      <div class="form__main">
        {{#each users}}
          <div class="chat-user">
          {{#if this.display_name}}
            <div class="chat-user__nick">{{this.display_name}}</div>
            {{else}}
            <div class="chat-user__nick">user-{{this.id}}</div>
            {{/if}}
            <div class="chat-user__delete" data-id="{{this.id}}">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5571 7.44397L7.44351 20.5576" stroke="black" stroke-width="1.5" stroke-linecap="square"/>
                <path d="M7.44336 7.44409L20.557 20.5577" stroke="black" stroke-width="1.5" stroke-linecap="square"/>
              </svg>
            </div>
          </div>
        {{/each}}
      </div>
    </form>
</div>
`;

export class ChatDeleteUser extends Block {
  constructor() {
    super({

      head: 'Нажмите на крестик чтобы удалить',

      users: store.getState().chatUsers,

      events: {
        click: async (event: MouseEvent) => {
          event.preventDefault();
          const element  = event.target as HTMLInputElement;
          if (element.closest('.chat-user__delete')) {
            const user = element.closest('.chat-user__delete');
            if (user) {
              const userId = Number((user as HTMLInputElement).dataset.id);
              const computedFormData: TDeleteUsers = {
                users: [userId],
                chatId: store.getState().chat.id
              };
              await chatApiController.deleteUsers(computedFormData as TDeleteUsers);
            }
          }

        }
      }
    });
  }

  componentDidMount() {
    this.setProps({users: store.getState().chatUsers});
    store.on(StoreEvents.Updated, () => this.props.users = store.getState().chatUsers);
    super.componentDidMount();
  }

  render() {
    return this.compile(template, this.props);
  }
}
