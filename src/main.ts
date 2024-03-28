import './styles/common.styl';

import { router } from './router';
import {registerComponent} from './tools/RegisterComponent.ts';
import * as Components from './components';

// console.log('Components: ', Components);

registerComponent('Button', Components.Button);
registerComponent('Link', Components.Link);
document.addEventListener('DOMContentLoaded', () => router(window.location.pathname));
