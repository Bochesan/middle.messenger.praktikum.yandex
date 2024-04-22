import './index.styl';
import Block from '../../../tools/Block.ts';
import {TProps} from '../../../types';
const template = `
<div class="chat-list">
    {{{chats}}}
</div>
`;

interface IProps {
  chats: Array<Block> | null
}

export class ChatList extends Block {
  constructor(props: IProps) {
    super({
      ...props,
    });
  }

  componentDidUpdate(oldProps?: TProps, newProps?: Partial<TProps>): boolean {
    if (this.props.chats) {
      this.lists.chats = this.props.chats;
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}


