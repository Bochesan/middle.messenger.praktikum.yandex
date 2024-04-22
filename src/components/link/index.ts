import './index.styl';
import Block from '../../tools/Block.ts';
import router from '../../router';
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
    click?: (event: MouseEvent) => void
  }
}

export class Link extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();

          router.go(this.props.url);
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
