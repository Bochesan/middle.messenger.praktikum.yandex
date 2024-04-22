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
  focus?: boolean
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
      inputValidate: false,

      focus: false,

      events: {
        blur: {
          element: 'input',
          event: (event: MouseEvent) => {
            this.onChange((event.target as HTMLInputElement).value);
          },
        }
      },
    });
  }

  // При событии blur записываем данные инпута и валидируем его
  onChange(value: string) {
    this.setValue(value);
    this.onValidateValue();
  }

  // Проверка валидации и запись, для отображения ошибки
  onValidateValue() {
    const {validate, message} =  getValidate(this.props.inputName, (this._element?.querySelector('input') as HTMLInputElement).value);
    return this.setProps({inputValidate: validate, inputError: message});
  }

  getValue() {
    return this.props.inputValue;
  }

  setValue(value: string) {
    return this.setProps({inputValue: value});
  }

  getValidate() {
    return this.props.inputValidate;
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}


