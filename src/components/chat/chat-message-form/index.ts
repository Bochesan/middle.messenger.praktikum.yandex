import './index.styl';
import Block from '../../../tools/Block.ts';
import {Submit, InputField} from '../../../components';

const template = `
<form class="message-form">
  <div class="message-form__input">
    {{{InputChat}}}
  </div>
  <div class="message-form__button">
    {{{SubmitButton}}}
  </div>
</form>
`;

const Inputs = {
  InputChat: {
      inputName: 'chat_message',
      inputPlaceholder: 'Сообщение'
    }
  };

export class ChatMessageForm extends Block {
  constructor() {
    super({


      InputChat: new InputField(Inputs.InputChat),

      SubmitButton: new Submit({
        label: 'Отправить',
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
            await window.socket?.send(JSON.stringify({
              content: formData.chat_message,
              type: 'message',
            }));
            for (const [key] of Object.entries(Inputs)) {
              this.children[key].setValue('');
            }
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
