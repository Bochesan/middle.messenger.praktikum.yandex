export const ChangePasswordPage = `
{{#> Dialog }}
	{{#> ModuleProfileForm formId="editForm" formMethod="POST" formAction="/api/v1/change-password/" }}
		{{> ModuleProfileHeader name="username" }}

		{{#> ModuleProfileMain }}
			{{> InputField inputLabel="Старый пароль" inputError="" inputPlaceholder="" inputName="oldPassword" inputType="password" }}
			{{> InputField inputLabel="Новый пароль" inputError="" inputPlaceholder="" inputName="newPassword" inputType="password" }}
			{{> InputField inputLabel="Повторите пароль" inputError="" inputPlaceholder="" inputName="confirm_password" inputType="password" }}
		{{/ ModuleProfileMain }}

		{{#> ModuleProfileFooter }}
			{{> Button text="Сохранить" }}
			{{> Button text="Отмена" url="/profile" }}
		{{/ ModuleProfileFooter }}
	{{/ ModuleProfileForm }}
{{/ Dialog }}
`;
