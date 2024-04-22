import Block from '../../../tools/Block.ts';
import {Submit, InputField} from '../../../components';
import {chatApiController} from '../../../controllers/ChatController.ts';
import {TCreateChat} from '../../../api/types';

const template = `
<form class="dialog">
    <div class="form">
      <div class="form__header">{{{ head }}}</div>
      <div class="form__main">
        {{{InputChatName}}}
      </div>
      <div class="form__footer">
        {{{SubmitButton}}}
      </div>
    </div>
</form>
`;

const Inputs = {
  InputChatName: {
      inputLabel: 'Название чата',
      inputName: 'chat_name',
    }
  };

export class ChatCreateForm extends Block {
  constructor() {
    super({

      head: 'Создать чат',

      InputChatName: new InputField(Inputs.InputChatName),

      SubmitButton: new Submit({
        label: 'Создать',
      }),

      events: {
        submit: async (event: MouseEvent) => {
          event.preventDefault();
          (event.target as HTMLInputElement).querySelectorAll('input').forEach(input => input.blur());

          let formValid = true;
          const formData: Record<string, unknown> = {};

          for (const [key, value] of Object.entries(Inputs)) {

            this.children[key].onValidateValue();
            if (!this.children[key].getValidate()) {
              formValid = false;
            }

            formData[value.inputName] = this.children[key].getValue();
          }

          console.log('Данные формы: ', formData);
          console.log('Статус валидации формы: ', formValid);

          if (formValid) {
            const computedFormData = { title: formData.chat_name};
            await chatApiController.createChat(computedFormData as TCreateChat).then(() => {
              for (const [key] of Object.entries(Inputs)) {

                this.children[key].setValue('');
              }
            });
            console.log('Форма отправлена');
          }
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
