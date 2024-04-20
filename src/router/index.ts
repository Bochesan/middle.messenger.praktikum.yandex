import * as Pages from '../pages';
import Router from '../tools/Router.ts';

const router = new Router('#app');

router
  .use('/', Pages.AuthPage)
  .use('/sign-up', Pages.RegisterPage)
  .use('/messenger', Pages.ChatPage)
  .use('/500', Pages.Error500)
  .use('/settings', Pages.ProfilePage)
  .use('/404', Pages.Error404)
  .use('/change-password', Pages.ChangePasswordPage);

export default router;
