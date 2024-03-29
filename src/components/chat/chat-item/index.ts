import './index.styl';
import Block from '../../../tools/Block.ts';
import {ChatAvatar} from '../chat-avatar';
const template = `
<div class="chat-item">
	<div class="chat-item__avatar">
		{{{ ChatAvatar }}}
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

interface IProps {
  chatItemAvatar?: string
  chatItemTitle: string
  chatItemSubtitle?: string
  chatItemDate?: string
  chatItemCount?: number | null
}

export class ChatItem extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      ChatAvatar: new ChatAvatar({
        src: props.chatItemAvatar || ''
      })
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}


