import './index.styl';
import Block from '../../tools/Block.ts';
const template = `
<a
	href="{{ url }}"
	class="link {{#if className}} {{className}}{{/if}}"
	{{#if disabled}} disabled="{{disabled}}"
	{{/if}} page="{{ page }}"
>
	{{ text }}
</a>
`;

interface IProps {
  text: string
  url: string
  className?: string
  disabled?: boolean
  onClick?: () => void
  events?: {
    click?: () => void
  }
}

export class Link extends Block {
  constructor(props: IProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
