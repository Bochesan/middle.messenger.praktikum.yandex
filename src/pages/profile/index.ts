import './index.styl';
import Block from '../../tools/Block.ts';
import {Button, InputField, ChatAvatar} from '../../components';

const template = `
<div class="dialog">
  <form class="profile-form">
    <div class="profile-header">
      <div class="profile-header__avatar">
        {{{ ChatAvatar }}}
      </div>
      <div class="profile-header__name">{{ name }}</div>
    </div>
    <div class="profile-main">
      {{{InputEmail}}}
      {{{InputLogin}}}
      {{{InputFirstName}}}
      {{{InputSecondName}}}
      {{{InputNickname}}}
      {{{InputPhone}}}
    </div>
    <div class="profile-footer">
    {{#if edit}}
      {{{SaveButton}}}
      {{{CancelButton}}}
    {{else}}
      {{{EditButton}}}
      {{{EditPasswordButton}}}
      {{{BackButton}}}
    {{/if}}
    </div>

  </form>
</div>
`;

interface IProps {
  ChatAvatar: Block
  InputEmail: Block
  InputLogin: Block
  InputFirstName: Block
  InputSecondName: Block
  InputNickname: Block
  InputPhone: Block
  EditButton: Block
  EditPasswordButton: Block
  BackButton: Block
  SaveButton: Block
  CancelButton: Block
}


const _Inputs: Record<string, any> = {
  InputEmail: {
    inputLabel: 'Почта',
    inputName: 'email',
    inputType: 'email',
    inputValue: 'username@yandex.ru',
    edit: false
  },

  InputLogin: {
    inputLabel: 'Логин',
    inputName: 'login',
    inputValue: 'username-13',
    edit: false
  },

  InputFirstName: {
    inputLabel: 'Имя',
    inputName: 'first_name',
    inputValue: 'Константин',
    edit: false
  },

  InputSecondName: {
    inputLabel: 'Фамилия',
    inputName: 'second_name',
    inputValue: 'Константинопольский',
    edit: false
  },

  InputNickname: {
    inputLabel: 'Имя в чате',
    inputName: 'display_name',
    inputValue: 'Username',
    edit: false
  },

  InputPhone: {
    inputLabel: 'Телефон',
    inputName: 'phone',
    inputType: 'phone',
    inputValue: '+79099999999',
    edit: false
  }
};

const Inputs = {..._Inputs};


export class ProfilePage extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      ChatAvatar: new ChatAvatar({
        mod: 'profile',
        src: '/media/upload/avatar.jpg'
      }),

      name: 'Username',
      edit: false,

      InputEmail: new InputField(Inputs.InputEmail),
      InputLogin: new InputField(Inputs.InputLogin),
      InputFirstName: new InputField(Inputs.InputFirstName),
      InputSecondName: new InputField(Inputs.InputSecondName),
      InputNickname: new InputField(Inputs.InputNickname),
      InputPhone: new InputField(Inputs.InputPhone),

      EditButton: new Button({
        label: 'Изменить данные',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            for (const [key] of Object.entries(Inputs)) {
              this.children[key].props.edit = true;
            }
            this.props.handleEdit(true);
          }
        }
      }),

      EditPasswordButton: new Button({
        label: 'Поменять пароль',
        url: '/change-password'
      }),

      BackButton: new Button({
        label: 'Назад',
        url: '/'
      }),

      SaveButton: new Button({
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

            console.log('Данные формы: ', formData);
            console.log('Статус валидации формы: ', formValid);

            if (formValid) {
              console.log('Форма отправлена');
              this.props.handleEdit(false);
            }
          }
        },
      }),

      CancelButton: new Button({
        label: 'Отмена',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            this.props.handleEdit(false, true);
          }
        }
      }),

      handleEdit: (value: boolean, reset: boolean = false) => {
        for (const [key] of Object.entries(Inputs)) {
          if (reset) {
            this.children[key].props.inputValue = _Inputs[key].inputValue;
          }
          this.children[key].props.edit = value;
        }
        this.props.edit = value;
      }



    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

