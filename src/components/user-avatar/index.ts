import './index.styl';
import Block from '../../tools/Block.ts';
import {RESOURCES} from '../../utils/Enums.ts';
import {store, StoreEvents} from '../../store';
import {userApiController} from '../../controllers/UserController.ts';
const template = `
<div class="user-avatar{{#if mod}} user-avatar--{{mod}}{{/if}}">
  <div class="user-avatar__image">
    {{#if src}} <img src="{{src}}" alt="{{alt}}"> {{/if}}
    {{#if edit}}
    <label class="user-avatar__label">
      <input class="user-avatar__input" type="file" accept="image/jpeg" >
      <span class="user-avatar__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18 3V8M18 8L16 6M18 8L20 6" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </label>
    {{/if}}
  </div>

  {{#if fileValidateError}}
  <div class="user-avatar__error">{{fileValidateMessage}}</div>
  {{/if}}
</div>
`;

interface IProps {
  mod?: 'chat'
  src?: string
  alt?: string
  edit?: boolean
}

export class UserAvatar extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      fileValidateError: false,
      fileValidateMessage: 'Файл не должен превышать 2мб и иметь тип jpg/jpeg',

      events: {
        change: {
          element: 'input',
          event: async (event: MouseEvent) => {
            const element  = event.target as HTMLInputElement;

            if (element?.files?.length) {
              const file = element.files[0];
              const fileName = file.name;

              if (file.size > 2097152 || !file.type || file.type !== 'image/jpeg') {
                return this.setProps({ fileValidateError: true });
              }

              console.log('file ', file);
              console.log('fileName ', fileName);

              const formData = new FormData();
              formData.append('avatar', file);

              if (formData) {
                await userApiController.changeAvatar(formData);
              }
            }
          },
        },
      }
    });
  }

  componentDidMount() {
    super.componentDidMount();
    store.on(StoreEvents.Updated, () => {
      this.props.src = `${store.getState().user.avatar !== null ? RESOURCES.Images + store.getState().user.avatar : ''}`;
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
