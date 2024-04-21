import './index.styl';
import Block from '../../tools/Block.ts';
import {getValidate} from '../../utils/Validate.ts';

const template = `
<label class="input-field{{#if className}} {{className}}{{/if}} {{#if edit}} input-field--edit{{/if}}">
	{{#if inputLabel}}<span class="input-field__title">{{ inputLabel }}</span>{{/if}}
	<input
		class="input-field__input"
		{{#if inputType}} type="{{inputType}}" {{else}}type="text"{{/if}}
		{{#if inputPlaceholder}}placeholder="{{inputPlaceholder}}"{{/if}}
		{{#if inputName}}name="{{inputName}}"{{/if}}
		{{#if inputValue}}value="{{inputValue}}"{{/if}}
		{{#if disabled}}disabled{{/if}}
	>
	<span class="input-field__error">{{ inputError}}</span>
</label>
`;

interface IProps {
  inputLabel?: string
  className?: string
  inputType?: string
  inputPlaceholder?: string
  inputName: string
  inputValue?: string
  inputError?: string
  events?: IProps
  onValidateValue?: () => void
  onChange?: (value: string) => void
  edit?: boolean
  disabled?: boolean
}

export class InputField extends Block {
  constructor(props: IProps) {
    super( {
      ...props,
      events: {
        blur: {
          element: 'input',
          event: (event: MouseEvent) => {
            this.props.onValidateValue();
            this.props.onChange((event.target as HTMLInputElement).value);
          },
        }
      },

      onChange: (value: string) => {
        this.setProps({inputValue: value});
      },

      onValidateValue: () => {
        const {validate, message} =  getValidate(this.props.inputName, (this._element?.querySelector('input') as HTMLInputElement).value);
        this.setError(message);
        return validate;
      },

      getValue: () => {
        return this.props.inputValue;
      }
    });

  }

  setError(message: string) {
    this.setProps({inputError: message});
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}


