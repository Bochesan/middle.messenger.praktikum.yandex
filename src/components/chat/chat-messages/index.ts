import './index.styl';
import Block from '../../../tools/Block.ts';
import {store, StoreEvents} from '../../../store';
import {TMessage} from '../../../types';
import {TChatUser} from '../../../api/types';

const template = `
<div class="chat-messages">
  {{#if messages}}
    <div class="chat-messages__messages">
      {{#each messages}}
        <div class="message message--{{this.class}}">
            <div class="message__user">{{this.user.display_name}}</div>
            <div class="message__content">{{this.content}}</div>
            <div class="message__time">{{this.time}}</div>
        </div>
      {{/each}}
    </div>
  {{else}}
    <div class="chat-messages__empty">Напишите первым</div>
  {{/if}}
</div>
`;


export class ChatMessages extends Block {
  constructor() {
    super({

      messages: store.getState().messages

    });
  }

  computedMessages(messages: Array<TMessage>) {
    if (messages === null || messages.length === 0) {
      return null;
    }
    return messages.reduce((acc: object, message: TMessage, index: number) => ({
      ...acc,
      [index]: {
        ...message,
        class: message.user_id === store.getState().user.id ? 'self' : 'other',
        user: store.getState().chatUsers.find((user: TChatUser) => user.id === message.user_id),
        time: `${new Date(message.time).getHours()}:${new Date(message.time).getMinutes()}`
      }
    }),{});
  }

  componentDidMount() {
    this.setProps({message: this.computedMessages(store.getState().messages)});
    store.on(StoreEvents.Updated, () => this.props.messages = this.computedMessages(store.getState().messages));
    super.componentDidMount();
  }

  render() {
    return this.compile(template, this.props);
  }
}
