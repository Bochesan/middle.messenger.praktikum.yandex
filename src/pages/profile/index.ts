export const ProfilePage = `
{{#> Dialog }}
	{{#> ModuleProfileDialog }}
		{{> ModuleProfileHeader name="username" }}

		{{#> ModuleProfileMain }}
			{{> Param key="Почта" value="username@yandex.ru" }}
			{{> Param key="Логин" value="username@yandex.ru" }}
			{{> Param key="Имя" value="Константин" }}
			{{> Param key="Фамилия" value="Константинопольский" }}
			{{> Param key="Имя в чате" value="Username" }}
			{{> Param key="Телефон" value="+7 (909) 999 99 99" }}
		{{/ ModuleProfileMain }}

		{{#> ModuleProfileFooter }}
			{{> Button text="Изменить данные" url="/edit" }}
			{{> Button text="Поменять пароль" url="/change-password" }}
			{{> Button text="Назад" url="/" }}
		{{/ ModuleProfileFooter }}
	{{/ ModuleProfileDialog }}
{{/ Dialog }}
`;
