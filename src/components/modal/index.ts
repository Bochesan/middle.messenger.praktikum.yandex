import './index.styl';
import Block from '../../tools/Block.ts';
import {store, StoreEvents} from '../../store';
import {TProps} from '../../types';


const template = `
{{#if show}}
<div class="modal">
  <div class="modal__container">
    <div class="modal__close">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.5571 7.44397L7.44351 20.5576" stroke="black" stroke-width="1.5" stroke-linecap="square"/>
          <path d="M7.44336 7.44409L20.557 20.5577" stroke="black" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
    </div>
    <div class="modal__content">
        {{{ content }}}
    </div>
  </div>
</div>
{{else}}
<span class="modal-placeholder"></span>
{{/if}}
`;

export class Modal extends Block {
  constructor(props: TProps) {
    super({
      ...props,

      show: false,


      events: {
        click: (event: MouseEvent) => {
          const element  = event.target as HTMLInputElement;
          if (element.closest('.modal__close')) {
            store.set({modal: null});
          }
        }
      }
    });
  }

  componentDidMount() {
    super.componentDidMount();

    store.on(StoreEvents.Updated, () => {
      this.setProps({show: this.props.modalName === store.getState().modal});
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
