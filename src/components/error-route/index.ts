import './index.styl';
import Block from '../../tools/Block.ts';
const template = `
<div class="error">
	<div class="error__code">{{ errorCode }}</div>
	{{#if errorMessage}}<div class="error__message">{{ errorMessage }}</div>{{/if}}
	{{#if errorLink}}<div class="error__footer">{{{ errorLink }}}</div>{{/if}}
</div>
`;

interface IProps {
  errorCode: any
  errorMessage?: any
  errorLink?: any
}

export class ErrorRoute extends Block {
  constructor(props: IProps) {
    super({
      ...props
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
