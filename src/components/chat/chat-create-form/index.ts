import Block from '../../../tools/Block.ts';
import {Submit, InputField} from '../../../components';
import {chatApiController} from '../../../controllers/ChatController.ts';
import {TCreateChat} from '../../../api/types';

const template = `
<div class="dialog">
    <form class="form">
      <div class="form__header">{{{ head }}}</div>
      <div class="form__main">
        {{{InputChatName}}}
      </div>
      <div class="form__footer">
        {{{SubmitButton}}}
      </div>
    </form>
</div>
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
        events: {
          click: async (event: MouseEvent) => {
            event.preventDefault();
            let formValid = true;
            const formData: Record<string, unknown> = {};

            for (const [key, value] of Object.entries(Inputs)) {

              if (!this.children[key].props.onValidateValue()) {
                formValid = false;
              }

              formData[value.inputName] = this.children[key].props.getValue();
            }

            console.log('Данные формы: ', formData);
            console.log('Статус валидации формы: ', formValid);

            if (formValid) {
              const computedFormData = { title: formData.chat_name};
              await chatApiController.createChat(computedFormData as TCreateChat).then(() => {
                for (const [key] of Object.entries(Inputs)) {

                  this.children[key].props.onChange('');
                }
              });
              console.log('Форма отправлена');
            }
          }
        },
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
