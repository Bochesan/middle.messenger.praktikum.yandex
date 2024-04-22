import './index.styl';
import Block from '../../tools/Block.ts';
import {Submit, Button, InputField, EventButton, UserAvatar} from '../../components';
import {store} from '../../store';
import {TUser} from '../../api/types';
import router from '../../router';
import {RESOURCES, ROUTE} from '../../utils/Enums.ts';
import {userApiController} from '../../controllers/UserController.ts';

const template = `
<form class="dialog">
  <div class="profile-form">
    <div class="profile-header">
      <div class="profile-header__avatar">
        {{{ ProfileAvatar }}}
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

  </div>
</form>
`;

interface IProps {
  ProfileAvatar: Block
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
    inputValue: '',
    edit: false,
    disabled: true,
  },

  InputLogin: {
    inputLabel: 'Логин',
    inputName: 'login',
    inputValue: '',
    edit: false,
    disabled: true,
  },

  InputFirstName: {
    inputLabel: 'Имя',
    inputName: 'first_name',
    inputValue: '',
    edit: false,
    disabled: true,
  },

  InputSecondName: {
    inputLabel: 'Фамилия',
    inputName: 'second_name',
    inputValue: '',
    edit: false,
    disabled: true,
  },

  InputNickname: {
    inputLabel: 'Имя в чате',
    inputName: 'display_name',
    inputValue: '',
    edit: false,
    disabled: true,
  },

  InputPhone: {
    inputLabel: 'Телефон',
    inputName: 'phone',
    inputType: 'phone',
    inputValue: '',
    edit: false,
    disabled: true,
  }
};

const Inputs = {..._Inputs};

export class ProfilePage extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      ProfileAvatar: new UserAvatar({
        src: '',
        edit: false
      }),

      edit: false,

      name: 'Username',
      InputEmail: new InputField(Inputs.InputEmail),
      InputLogin: new InputField(Inputs.InputLogin),
      InputFirstName: new InputField(Inputs.InputFirstName),
      InputSecondName: new InputField(Inputs.InputSecondName),
      InputNickname: new InputField(Inputs.InputNickname),
      InputPhone: new InputField(Inputs.InputPhone),

      EditButton: new EventButton({
        label: 'Изменить данные',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            for (const [key] of Object.entries(Inputs)) {
              this.children[key].setProps({edit: true});
            }
            this.children.ProfileAvatar.setProps({edit: true});
            this.props.handleEdit(true);
          }
        }
      }),

      EditPasswordButton: new Button({
        label: 'Поменять пароль',
        url: '/change-password'
      }),

      BackButton: new EventButton({
        label: 'Назад',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            router.go(ROUTE.Chat);
          }
        }
      }),

      SaveButton: new Submit({
        label: 'Сохранить',
      }),

      CancelButton: new EventButton({
        label: 'Отмена',
        events: {
          click: (event: MouseEvent) => {
            event.preventDefault();
            this.children.ProfileAvatar.setProps({edit: false});
            this.props.handleEdit(false);
          }
        }
      }),

      handleEdit: async (value: boolean) => {
        this.setProps({edit: value});
        this.initState(value);
      },

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
            await userApiController.edit(formData as TUser);
            await this.initState();
            console.log('Форма отправлена');
            this.children.ProfileAvatar.setProps({edit: false});
            this.props.handleEdit(false);
          }
        }
      },
    });
  }

  initState(editable = false) {
    const edit = editable;
    const disabled = !editable;
    const { user } = store.getState();
    this.setProps({
      name: user.display_name !== null ? user.display_name : `user-${user.id}`,
    });

    this.children.ProfileAvatar.setProps({src: `${user.avatar === null ? '' : RESOURCES.Images + user.avatar}`});

    this.children.InputEmail.setProps({inputValue: user.email, edit, disabled});
    this.children.InputLogin.setProps({inputValue: user.login, edit, disabled});
    this.children.InputFirstName.setProps({inputValue: user.first_name, edit, disabled});
    this.children.InputSecondName.setProps({inputValue: user.second_name, edit, disabled});
    this.children.InputNickname.setProps({inputValue: user.display_name !== null ? user.display_name : `user-${user.id}`, edit, disabled});
    this.children.InputPhone.setProps({inputValue: user.phone, edit, disabled});
  }

  componentDidMount() {
    this.initState();
  }

  render() {
    return this.compile(template, this.props);
  }
}

