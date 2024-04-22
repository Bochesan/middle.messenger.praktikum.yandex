import './styles/common.styl';

import {registerComponent} from './tools/RegisterComponent.ts';
import * as Components from './components';
import router from './router';
import { middlewareAuth } from './midleware/midlewareAuth.ts';

registerComponent('Button', Components.Button);
registerComponent('EventButton', Components.EventButton);
registerComponent('Submit', Components.Submit);
registerComponent('InputField', Components.InputField);
registerComponent('Link', Components.Link);
registerComponent('ErrorRoute', Components.ErrorRoute);
registerComponent('ChatAvatar', Components.ChatAvatar);
registerComponent('ChatLayout', Components.ChatLayout);
registerComponent('ChatItem', Components.ChatItem);
registerComponent('ChatCreate', Components.ChatCreate);
registerComponent('SearchForm', Components.SearchForm);
registerComponent('Logout', Components.Logout);
registerComponent('Settings', Components.Settings);
registerComponent('UserAvatar', Components.UserAvatar);
registerComponent('Modal', Components.Modal);
registerComponent('ChatCreateForm', Components.ChatCreateForm);
registerComponent('ChatHead', Components.ChatHead);
registerComponent('ChatAddUser', Components.ChatAddUser);
registerComponent('ChatDeleteUser', Components.ChatDeleteUser);
registerComponent('ChatMessages', Components.ChatMessages);
registerComponent('ChatMessageForm', Components.ChatMessageForm);



document.addEventListener('DOMContentLoaded', async () => {
  await middlewareAuth();
  router.start();
});
