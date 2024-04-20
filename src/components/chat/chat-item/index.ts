import './index.styl';
import Block from '../../../tools/Block.ts';
import {ChatAvatar} from '../chat-avatar';
import {RESOURCES} from '../../../utils/Enums.ts';
import {IChatItem} from '../../../api/types';
import {store, StoreEvents} from '../../../store';
import {chatApiController} from '../../../controllers/ChatController.ts';
import {WSConnect} from '../../../tools/WSConnect.ts';
const template = `
<div class="chat-item {{#if isActive}} chat-item--active {{/if}}">
	<div class="chat-item__avatar">
		{{{ ChatAvatarImage }}}
	</div>
	<div class="chat-item__main">
		<div class="chat-item__note">
			<div class="chat-item__title">{{ chatItemTitle }}</div>
			{{#if chatItemSubtitle}}<div class="chat-item__subtitle">{{ chatItemSubtitle }}</div>{{/if}}
		</div>
		<div class="chat-item__info">
			<div class="chat-item__date">{{ chatItemDate }}</div>
			{{#if chatItemCount}}<div class="chat-item__count">{{ chatItemCount }}</div>{{/if}}
		</div>
	</div>
</div>
`;

export class ChatItem extends Block {
  constructor(props: IChatItem) {
    super({
      ...props,

      isActive: store.getState().chat?.id === props.id,

      chatItemId: props.id,
      chatItemAvatar: props.avatar !== null ? `${RESOURCES.Images}${props.avatar}` : null,
      chatItemTitle: props.title,
      chatItemSubtitle: props.last_message?.content || '',
      chatItemDate: props.last_message?.time || undefined,
      chatItemCount: props.unread_count || null,

      ChatAvatarImage: new ChatAvatar({
        src: props.avatar !== null ? `${RESOURCES.Images}${props.avatar}` : undefined,
      }),

      events: {
        click: async (event: MouseEvent) => {
          event.preventDefault();
          const activeChat = store.getState().chats.find((chat: IChatItem) => chat.id === this.props.id);
          await chatApiController.getChatUsers(activeChat.id);
          await chatApiController.getChatToken(activeChat.id);
          store.set({chat: {...activeChat}, token: store.getState().token, messages: null});
          store.set({socket: WSConnect()});
        }
      }
    });
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.props.last_message) {
      const dateObj = new Date(this.props.last_message.time);
      const dateFormat = `${dateObj.getFullYear()}.${dateObj.getMonth()+1}.${dateObj.getDate()}`;
      this.setProps({chatItemDate: dateFormat});
    }
    store.on(StoreEvents.Updated, () => this.props.isActive = store.getState().chat?.id === this.props.id,);
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}


