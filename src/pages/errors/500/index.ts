import Block from '../../../tools/Block.ts';
import {Button, ErrorRoute} from '../../../components';
const template = `
<div class="dialog">
  {{{ Error }}}
</div>
`;

interface IProps {
  Error: Block
}


export class Error500 extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      Error: new ErrorRoute({
        errorCode: '500',
        errorMessage: 'Мы уже фиксим',
        errorLink: new Button({
          label: 'Назад к чатам',
          url: '/messenger',
        })
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
