import './index.styl';
import Block from '../../../tools/Block.ts';
import {MessageForm} from '../../message-form';
const template = `
<div class="chat-layout">
  {{#if messages}}
    <div class="chat-layout__empty">{{ emptyMessage }}</div>
    {{{ MessageFormSection }}}
  {{else}}
	  <div class="chat-layout__empty">{{ emptyMessage }}</div>
  {{/if}}
</div>
`;

interface IProps {
  messages?: string
  emptyMessage?: string
}

export class ChatLayout extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      MessageFormSection: new MessageForm({
        inputName: 'message',
        placeholder: 'Введите сообщение'
      })
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}

