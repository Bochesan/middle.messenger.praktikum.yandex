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


export class Error404 extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      Error: new ErrorRoute({
        errorCode: '404',
        errorMessage: 'Не туда попали',
        errorLink: new Button({
          label: 'Назад к чатам',
          url: '/',
        })
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
