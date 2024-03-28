import './index.styl';
import Block from '../../tools/Block.ts';
import {Button, InputField, Link} from '../../components';
const template = `
<div class="dialog">
  <div class="auth-main">
    <form class="auth-form">
      <div class="auth-header">
        {{{LinkAuth}}}
        {{{LinkRegister}}}
      </div>
      <div class="auth-main">
        {{{InputEmail}}}
        {{{InputLogin}}}
        {{{InputFirstName}}}
        {{{InputSecondName}}}
        {{{InputPhone}}}
        {{{InputPassword}}}
        {{{InputConfirmPassword}}}
      </div>
      <div class="auth-footer">
        {{{FormButton}}}
      </div>
    </form>
  </div>
</div>
`;

interface IProps {
  LinkAuth: Block
  LinkRegister: Block
  InputEmail: Block
  InputLogin: Block
  InputFirstName: Block
  InputSecondName: Block
  InputPhone: Block
  InputPassword: Block
  InputConfirmPassword: Block
  FormButton: Block
}

const Inputs = {
  InputEmail: {
    inputLabel: 'Почта',
    inputName: 'email',
    inputType: 'email',
  },

  InputLogin: {
    inputLabel: 'Логин',
    inputName: 'login',
  },

  InputFirstName: {
    inputLabel: 'Имя',
    inputName: 'first_name',
  },

  InputSecondName: {
    inputLabel: 'Фамилия',
    inputName: 'second_name',
  },

  InputPhone: {
    inputLabel: 'Телефон',
    inputName: 'phone',
    inputType: 'phone',
  },

  InputPassword: {
    inputLabel: 'Пароль',
    inputName: 'password',
    inputType: 'password',
  },

  InputConfirmPassword: {
    inputLabel: 'Пароль (еще раз)',
    inputName: 'confirm_password',
    inputType: 'password',
  }
};

export class RegisterPage extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      LinkAuth: new Link({
        text: 'Авторизация',
        url: '/auth',
      }),

      LinkRegister: new Link({
        text: 'Регистрация',
        url: '/register',
        disabled: true,
      }),

      InputEmail: new InputField(Inputs.InputEmail),
      InputLogin: new InputField(Inputs.InputLogin),
      InputFirstName: new InputField(Inputs.InputFirstName),
      InputSecondName: new InputField(Inputs.InputSecondName),
      InputPhone: new InputField(Inputs.InputPhone),
      InputPassword: new InputField(Inputs.InputPassword),
      InputConfirmPassword: new InputField(Inputs.InputConfirmPassword),

      FormButton: new Button({
        label: 'Зарегистрироваться',
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
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
