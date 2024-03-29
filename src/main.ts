import './styles/common.styl';

import { router } from './router';
import {registerComponent} from './tools/RegisterComponent.ts';
import * as Components from './components';

registerComponent('Button', Components.Button);
registerComponent('InputField', Components.InputField);
registerComponent('Link', Components.Link);
registerComponent('ErrorRoute', Components.ErrorRoute);
registerComponent('ChatAvatar', Components.ChatAvatar);
registerComponent('ChatLayout', Components.ErrorRoute);
registerComponent('ChatItem', Components.ErrorRoute);
registerComponent('SearchForm', Components.ErrorRoute);

document.addEventListener('DOMContentLoaded', () => router(window.location.pathname));
