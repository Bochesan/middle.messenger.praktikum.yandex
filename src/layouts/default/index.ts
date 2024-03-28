import Block from '../../tools/Block.ts';
const template = `
<div class="dialog 111">
  {{{ slot }}}

<!--  For Develop-->
  <div class="sitemap">
    <div class="sitemap__title">Sitemap</div>
      <div class="sitemap__list">
        <a href="/auth" class="link">Вход</a>
        <a href="/register" class="link">Регистрация</a>
        <a href="/404" class="link">Ошибка 404</a>
        <a href="/500" class="link">Ошибка 500</a>
        <a href="/" class="link">Чат</a>
        <a href="/profile" class="link">Профиль</a>
        <a href="/edit" class="link">Редактирование профиля</a>
        <a href="/change-password" class="link">Изменение пароля</a>
      </div>
    </div>
  </div>
</div>
`;

export class LayoutDefault extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
