import './styles/common.styl';
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Modules from './modules';
import * as Pages from './pages';

const pages: Record<string, any> = {
	'auth': [Pages.AuthPage],
	'register': [Pages.RegisterPage],
	'404': [Pages.Error404],
	'500': [Pages.Error500],
	'chat': [Pages.ChatPage],
};

Object.entries(Components).forEach(([name, component]) => {
	Handlebars.registerPartial(name, component);
});
Object.entries(Modules).forEach(([name, component]) => {
	Handlebars.registerPartial(name, component);
});

const navigateTo = (page: string) => {
	const [source, args] = pages[page];
	const handlebarsCompileHTML = Handlebars.compile(source);
	return document.querySelector<HTMLElement>('#app')!.innerHTML = handlebarsCompileHTML(args);
};

document.addEventListener('DOMContentLoaded', () => {
	const page = location.pathname.substring(1);
	if (page.length === 0) {
		return navigateTo('chat');
	}
	if (pages[page] !== undefined) {
		return navigateTo(page);
	}
	return navigateTo('404');

});

document.addEventListener('click', e => {
	if (e.target instanceof HTMLElement) {
		const disabled = e.target.getAttribute('disabled');

		if (disabled) {
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}
});

// For develop
document.addEventListener('DOMContentLoaded', () => {
	const handlebarsCompileHTML = Handlebars.compile(Modules.ModuleSitemap);
	return document.querySelector<HTMLElement>('#sitemap')!.innerHTML = handlebarsCompileHTML(undefined);
});
