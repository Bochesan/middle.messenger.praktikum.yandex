import Block from '../../../tools/Block.ts';
import {Submit, InputField} from '../../../components';
import {chatApiController} from '../../../controllers/ChatController.ts';
import {TAddUsers} from '../../../api/types';
import {store} from '../../../store';

const template = `
<div class="dialog">
    <form class="form">
      <div class="form__header">{{{ head }}}</div>
      <div class="form__main">
        {{{InputIDName}}}
      </div>
      <div class="form__footer">
        {{{SubmitButton}}}
      </div>
    </form>
</div>
`;

const Inputs = {
  InputIDName: {
      inputLabel: 'ID пользователя',
      inputName: 'user_name',
    }
  };

export class ChatAddUser extends Block {
  constructor() {
    super({

      head: 'Перечислите ID пользователей, которых хотите добавить, через запятую',

      InputIDName: new InputField(Inputs.InputIDName),

      SubmitButton: new Submit({
        label: 'Добавить',
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
              const users = (formData.user_name as string).split(',');
              const computedFormData: TAddUsers = {
                users: users.map(Number),
                chatId: store.getState().chat.id
              };
              await chatApiController.addUsers(computedFormData as TAddUsers).then(() => {
                for (const [key] of Object.entries(Inputs)) {
                  this.children[key].props.onChange('');
                  store.set({modal: null});
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
