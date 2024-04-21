import './index.styl';
import Block from '../../tools/Block.ts';
import {getValidate} from '../../utils/Validate.ts';

const template = `
<input
  class="form-input"
  value="{{inputValue}}"

  {{#if inputType}}
    type="{{inputType}}"
  {{else}}
    type="text"
  {{/if}}
  {{#if inputPlaceholder}}placeholder="{{inputPlaceholder}}"{{/if}}
  {{#if inputName}}name="{{inputName}}"{{/if}}
  {{#if inputValue}}value="{{inputValue}}"{{/if}}
  {{#if disabled}}disabled{{/if}}
/>
`;

interface IProps {
  className?: string
  inputType?: string
  inputPlaceholder?: string
  inputName?: string
  inputValue?: string

  events?: IProps
  onValidateValue?: () => void
  edit?: boolean
  disabled?: boolean
}

export class CInput extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      inputValue: '',

      events: {
        blur: (event: MouseEvent) => {
          event.preventDefault();
          this.setProps({inputValue: (event.target as HTMLInputElement).value});
        }
      },

      onValidateValue: () => {
        const {validate} =  getValidate(this.props.inputName, (this._element?.querySelector('input') as HTMLInputElement).value);
        return validate;
      },

    });
  }

  getValue() {
    return this.props.inputValue;
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
