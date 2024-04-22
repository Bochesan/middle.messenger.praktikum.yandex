import './index.styl';
import Block from '../../../tools/Block.ts';
import {Button} from '../../button';
import {store} from '../../../store';

const template = `
<div class="chat-delete">
  {{{ DeleteButton }}}
</div>
`;

export class ChatDelete extends Block {
  constructor() {
    super({

      DeleteButton: new Button({
        label: 'Удалить чат',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            const chatId = store.getState().chat.id;
            console.log(chatId);
          }
        }
      })
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
