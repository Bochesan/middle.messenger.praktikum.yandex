import './index.styl';
import Block from '../../tools/Block.ts';

const template = `
<button class="button{{#if className}} {{className}}{{/if}}">
	{{ label }}
</button>
`;

interface IProps {
  label: string
  className?: string
  events?: {
    click: (event: MouseEvent) => void
  }
}

export class EventButton extends Block {
  constructor(props: IProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
