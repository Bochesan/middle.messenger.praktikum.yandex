import './styles/common.styl';
import Handlebars from 'handlebars';
import * as Pages from './pages';

const pages: Record<string, any> = {
	'auth': [Pages.AuthPage],
	'register': [Pages.RegisterPage]
};

const navigateTo = (page: string) => {
	console.log(page);
	const [source, args] = pages[page];
	console.log(pages[page]);
	const handlebarsCompileHTML = Handlebars.compile(source);
	return document.querySelector<HTMLElement>('#app')!.innerHTML = handlebarsCompileHTML(args);
};

document.addEventListener('DOMContentLoaded', () => {
	navigateTo('auth');
});

document.addEventListener('click', e => {
	if (e.target instanceof HTMLElement) {
		const page = e.target.dataset.page;
		if (page) {
			navigateTo(page);

			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}
});
