import './index.styl';
import Block from '../../tools/Block.ts';
import {Submit, InputField, Link} from '../../components';
import {TSignup} from '../../api/types';
import {authApiController} from '../../controllers/AuthController.ts';
const template = `
<form class="dialog">
  <div class="auth-main">
    <div class="auth-form">
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
        {{{SubmitButton}}}
      </div>
    </div>
  </div>
</form>
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
  Submit: Block
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
        url: '/',
      }),

      LinkRegister: new Link({
        text: 'Регистрация',
        url: '/sign-up',
        disabled: true,
      }),

      InputEmail: new InputField(Inputs.InputEmail),
      InputLogin: new InputField(Inputs.InputLogin),
      InputFirstName: new InputField(Inputs.InputFirstName),
      InputSecondName: new InputField(Inputs.InputSecondName),
      InputPhone: new InputField(Inputs.InputPhone),
      InputPassword: new InputField(Inputs.InputPassword),
      InputConfirmPassword: new InputField(Inputs.InputConfirmPassword),

      SubmitButton: new Submit({
        label: 'Зарегистрироваться',
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

          if (this.children['InputPassword'].getValue() !== this.children['InputConfirmPassword'].getValue()) {
            formValid = false;
            this.children['InputConfirmPassword'].props.inputError = 'Пароли не совпадают';
          }

          console.log('Данные формы: ', formData);
          console.log('Статус валидации формы: ', formValid);

          if (formValid) {
            await authApiController.signup(formData as TSignup);
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
