import './index.styl';
import Block from '../../tools/Block.ts';
import {Submit, InputField, Link} from '../../components';
import {TSignin} from '../../api/types';
import {authApiController} from '../../controllers/AuthController.ts';

const template = `
<div class="dialog">
  <div class="auth-main">
    <form class="auth-form">
      <div class="auth-header">
        {{{LinkAuth}}}
        {{{LinkRegister}}}
      </div>
      <div class="auth-main">
        {{{InputLogin}}}
        {{{InputPassword}}}
      </div>
      <div class="auth-footer">
        {{{SubmitButton}}}
      </div>
    </form>
  </div>
</div>
`;

interface IProps {
  LinkAuth: Block
  LinkRegister: Block
  InputLogin: Block
  InputPassword: Block
  Submit: Block
}

const Inputs = {
    InputLogin: {
      inputLabel: 'Логин',
      inputName: 'login',
    },

    InputPassword: {
      inputLabel: 'Пароль',
      inputName: 'password',
      inputType: 'password',
    }
  };

export class AuthPage extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      LinkAuth: new Link({
        text: 'Авторизация',
        url: '/',
        disabled: true,
      }),

      LinkRegister: new Link({
        text: 'Регистрация',
        url: '/sign-up',
      }),

      InputLogin: new InputField(Inputs.InputLogin),

      InputPassword: new InputField(Inputs.InputPassword),

      SubmitButton: new Submit({
        label: 'Войти',
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
              await authApiController.signin(formData as TSignin);
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
