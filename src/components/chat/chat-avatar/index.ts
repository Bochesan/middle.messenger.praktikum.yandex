import './index.styl';
import Block from '../../../tools/Block.ts';
const template = `
<div class="chat-avatar{{#if mod}} chat-avatar--{{mod}}{{/if}}">
	{{#if src}} <img src="{{src}}" alt="{{alt}}"> {{/if}}
</div>
`;

interface IProps {
  mod?: 'profile'
  src?: string
  alt?: string
}

export class ChatAvatar extends Block {
  constructor(props: IProps) {
    super({
      ...props
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
