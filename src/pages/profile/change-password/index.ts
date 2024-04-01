import '../index.styl';
import Block from '../../../tools/Block.ts';
import {Button, InputField, ChatAvatar} from '../../../components';

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
      {{{Submit}}}
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

      Submit: new Button({
        label: 'Сохранить',
        events: {
          click: (event) => {
            event.preventDefault();
            let formValid = true;
            const formData: Record<string, string> = {};

            for (const [key, value] of Object.entries(Inputs)) {

              if (!this.children[key].props.onValidateValue()) {
                formValid = false;
              }

              formData[value.inputName] = this.children[key].props.getValue();
            }

            if (this.children['InputPassword'].props.getValue() !== this.children['InputConfirmPassword'].props.getValue()) {
              formValid = false;
              this.children['InputConfirmPassword'].props.inputError = 'Пароли не совпадают';
            }

            console.log('Данные формы: ', formData);
            console.log('Статус валидации формы: ', formValid);

            if (formValid) {
              console.log('Форма отправлена');
            }
          }
        },
      }),

      CancelButton: new Button({
        label: 'Отмена',
        url: '/'
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
