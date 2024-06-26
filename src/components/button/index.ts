import './index.styl';
import Block from '../../tools/Block.ts';
import router from '../../router';

const template = `
{{#if url}}
<a
	class="button button--link{{#if className}} {{className}}{{/if}}"
	href="{{url}}"
>
	{{ label }}
</a>
{{else}}
<button class="button{{#if className}} {{className}}{{/if}}">
	{{ label }}
</button>
{{/if}}
`;

interface IProps {
  label: string
  className?: string
  events?: {
    click: (event: MouseEvent) => void
  }
  url?: string
}

export class Button extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          if (this.props.url) {
            router.go(this.props.url);
          }
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
