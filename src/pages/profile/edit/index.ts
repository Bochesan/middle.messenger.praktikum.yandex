export const EditPage = `
{{#> Dialog }}
	{{#> ModuleProfileForm formId="editForm" formMethod="POST" formAction="/api/v1/edit/" }}
		{{> ModuleProfileHeader name="username" }}

		{{#> ModuleProfileMain }}
			{{> InputField inputLabel="Почта" inputError="" inputPlaceholder="" inputName="email" inputType="email" inputValue="username@yandex.ru" }}
			{{> InputField inputLabel="Логин" inputError="" inputPlaceholder="" inputName="login" inputValue="username@yandex.ru" }}
			{{> InputField inputLabel="Имя" inputError="" inputPlaceholder="" inputName="first_name" inputValue="Константин" }}
			{{> InputField inputLabel="Фамилия" inputError="" inputPlaceholder="" inputName="second_name" inputValue="Константинопольский" }}
			{{> InputField inputLabel="Имя в чате" inputError="" inputPlaceholder="" inputName="display_name" inputValue="Username" }}
			{{> InputField inputLabel="Телефон" inputError="" inputPlaceholder="" inputName="phone" inputType="phone" inputValue="+7 (909) 999 99 99" }}
		{{/ ModuleProfileMain }}

		{{#> ModuleProfileFooter }}
			{{> Button text="Сохранить" }}
			{{> Button text="Отмена" url="/profile" }}
		{{/ ModuleProfileFooter }}
	{{/ ModuleProfileForm }}
{{/ Dialog }}
`;
