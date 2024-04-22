import '../index.styl';
import Block from '../../../tools/Block.ts';
import {EventButton, Submit, InputField, ChatAvatar} from '../../../components';
import router from '../../../router';
import {TPassword} from '../../../api/types';
import {userApiController} from '../../../controllers/UserController.ts';

const template = `
<form class="dialog">
  <div class="profile-form">
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
  </div>
</form>
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
      }),

      CancelButton: new EventButton({
        label: 'Отмена',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            router.back();
          }
        }
      }),

      events: {
        submit: async (event: MouseEvent) => {
          event.preventDefault();
          (event.target as HTMLInputElement).querySelectorAll('input').forEach(input => input.blur());

          let formValid = true;
          const formData: Record<string, unknown> = {};

          for (const [key] of Object.entries(Inputs)) {
            this.children[key].onValidateValue();
            if (!this.children[key].getValidate()) {
              formValid = false;
            }
          }

          if (this.children['InputPassword'].getValue() !== this.children['InputConfirmPassword'].getValue()) {
            formValid = false;
            this.children['InputConfirmPassword'].props.inputError = 'Пароли не совпадают';
          }

          formData.oldPassword = this.children.InputOldPassword.getValue();
          formData.newPassword = this.children.InputPassword.getValue();

          console.log('Данные формы: ', formData);
          console.log('Статус валидации формы: ', formValid);

          if (formValid) {
            await userApiController.changePWD(formData as TPassword);
            console.log('Форма отправлена');
          }
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
