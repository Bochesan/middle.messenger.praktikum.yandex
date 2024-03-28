import * as Pages from '../pages';


const PAGES: Record<string, any> = {
  '/auth': Pages.AuthPage,
  '/register': Pages.RegisterPage,
  // '/404': [Pages.Error404],
  // '/500': [Pages.Error500],
  // '/': [Pages.ChatPage],
  // '/profile': [Pages.ProfilePage],
  // '/edit': [Pages.EditPage],
  // '/change-password': [Pages.ChangePasswordPage],
};

export function router(name: string, selector = '#app') {
  const root = document.querySelector(selector)!;
  root.innerHTML = '';
  const Page = PAGES[name] === undefined ? PAGES['404'] : PAGES[name];
  const page = new Page();

  root.append(page.getContent()!);
  page.dispatchComponentDidMount();
}
