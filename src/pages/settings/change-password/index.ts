import '../index.styl';
import Block from '../../../tools/Block.ts';
import {EventButton, Submit, InputField, ChatAvatar} from '../../../components';
import router from '../../../router';
import {TPassword} from '../../../api/types';
import {userApiController} from '../../../controllers/UserController.ts';

const template = `
<div class="dialog">
  <form class="profile-form">
    <div class="profile-header">
      <div class="profile-header__avatar">
        {{{ ChatAvatarImage }}}
      </div>
      <div class="profile-header__name">{{ name }}</div>
    </div>
    <div class="profile-main">
      {{{InputOldPassword}}}
      {{{InputPassword}}}
      {{{InputConfirmPassword}}}
    </div>
    <div class="profile-footer">
      {{{SubmitButton}}}
      {{{CancelButton}}}
    </div>
  </form>
</div>
`;

interface IProps {
  ChatAvatarImage: Block
  InputOldPassword: Block
  InputPassword: Block
  InputConfirmPassword: Block
  Submit: Block
  CancelButton: Block
}

const Inputs = {
  InputOldPassword: {
    inputLabel: 'Старый пароль',
    inputName: 'password',
    inputType: 'password',
  },

  InputPassword: {
    inputLabel: 'Новый пароль',
    inputName: 'new_password',
    inputType: 'password',
  },

  InputConfirmPassword: {
    inputLabel: 'Повторите пароль',
    inputName: 'confirm_password',
    inputType: 'password',
  }
};


export class ChangePasswordPage extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      ChatAvatarImage: new ChatAvatar({
        mod: 'profile',
        src: '/upload/avatar.jpg'
      }),

      name: 'Username',

      InputOldPassword: new InputField(Inputs.InputOldPassword),
      InputPassword: new InputField(Inputs.InputPassword),
      InputConfirmPassword: new InputField(Inputs.InputConfirmPassword),

      SubmitButton: new Submit({
        label: 'Сохранить',
        events: {
          click: async (event) => {
            event.preventDefault();
            let formValid = true;
            const formData: Record<string, unknown> = {};

            for (const [key] of Object.entries(Inputs)) {

              if (!this.children[key].props.onValidateValue()) {
                formValid = false;
              }
            }

            if (this.children['InputPassword'].props.getValue() !== this.children['InputConfirmPassword'].props.getValue()) {
              formValid = false;
              this.children['InputConfirmPassword'].props.inputError = 'Пароли не совпадают';
            }

            formData.oldPassword = this.children.InputOldPassword.props.getValue();
            formData.newPassword = this.children.InputPassword.props.getValue();

            console.log('Данные формы: ', formData);
            console.log('Статус валидации формы: ', formValid);

            if (formValid) {
              await userApiController.changePWD(formData as TPassword);
              console.log('Форма отправлена');
            }
          }
        },
      }),

      CancelButton: new EventButton({
        label: 'Отмена',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            router.back();
          }
        }
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
