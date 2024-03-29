import './index.styl';
import Block from '../../tools/Block.ts';

const template = `
<form class="search-form">
  <input
    class="search-form__input"
    type="text"
    placeholder="{{ placeholder }}"
    {{#if inputName}}name="{{inputName}}"{{/if}}
		{{#if inputValue}}value="{{inputValue}}"{{/if}}
	/>
</form>
`;

interface IProps {
  placeholder?: string
  inputName: string
  inputValue?: string
}

export class SearchForm extends Block {
  constructor(props: IProps) {
    super( {
      ...props,

      events: {
        input: {
          element: 'input',
          event: (event: MouseEvent) => this.props.setState((event.target as HTMLInputElement).value),
        },
        submit: (event: MouseEvent) => {
          event.preventDefault();
          console.log('Строка поиска: ', this.props.getValue());
        }
      },

      setState: (value: string) => {
        this.state.value = value;
      },

      getValue: () => {
        return this.state.value;
      }
    });

  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}


