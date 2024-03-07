import './styles/common.styl';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Modules from './modules';
import * as Pages from './pages';

const pages: Record<string, any> = {
	'auth': [Pages.AuthPage],
	'register': [Pages.RegisterPage]
};

Object.entries(Components).forEach(([ name, component ]) => {
	Handlebars.registerPartial(name, component);
});
Object.entries(Modules).forEach(([ name, component ]) => {
	Handlebars.registerPartial(name, component);
});

const navigateTo = (page: string) => {
	const [source, args] = pages[page];
	const handlebarsCompileHTML = Handlebars.compile(source);
	return document.querySelector<HTMLElement>('#app')!.innerHTML = handlebarsCompileHTML(args);
};

document.addEventListener('DOMContentLoaded', () => {
	navigateTo('auth');
});

document.addEventListener('click', e => {
	if (e.target instanceof HTMLElement) {
		const page = e.target.getAttribute('page');
		const disabled = e.target.getAttribute('disabled');

		if (page) {
			e.preventDefault();
			e.stopImmediatePropagation();

			if (!disabled) {
				navigateTo(page);
			}
		}
	}
});
