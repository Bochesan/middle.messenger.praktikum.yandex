import './index.styl';
import Block from '../../tools/Block.ts';
import router from '../../router';
import {ROUTE} from '../../utils/Enums.ts';

const template = `
<div class="settings">
  <div class="settings__icon">
    <img src="/media/icons/icon-settings.svg" alt="icon-settings">
  </div>
  <div class="settings__title">{{ title }}</div>
</div>
`;

export class Settings extends Block {
  constructor() {
    super({
      title: 'Профиль',
      events: {
        click: async () => {
          router.go(ROUTE.Settings);
        }
      }
    });
  }

  render() {
    return this.compile(template, this.props as Record<string, unknown>);
  }
}
