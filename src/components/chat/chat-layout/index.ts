import './index.styl';
import Block from '../../../tools/Block.ts';
import {store, StoreEvents} from '../../../store';
import {ChatHead} from '../chat-head';
import {ChatMessages} from '../chat-messages';
import {ChatMessageForm} from '../chat-message-form';

const template = `
<div class="chat-layout">
  {{#if activeChat}}
    <div class="chat-layout__body">
      <div class="chat-layout__header">{{{ ChatLayoutHeader }}}</div>
      <div class="chat-layout__main">{{{ ChatLayoutMain }}}</div>
      <div class="chat-layout__footer">{{{ ChatLayoutForm }}}</div>
    </div>
  {{else}}
	  <div class="chat-layout__empty">{{ emptyMessage }}</div>
  {{/if}}
</div>
`;

export class ChatLayout extends Block {
  constructor() {
    super({
      activeChat: null,
      emptyMessage: 'Выберите чат',

      ChatLayoutHeader: new ChatHead(),

      ChatLayoutMain: new ChatMessages(),

      ChatLayoutForm: new ChatMessageForm(),

    });
  }

  componentDidMount() {
    store.on(StoreEvents.Updated, () => this.props.activeChat = store.getState().chat?.id);
    super.componentDidMount();
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
