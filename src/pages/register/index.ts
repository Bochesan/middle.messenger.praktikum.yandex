export const RegisterPage = `
{{#> Dialog }}
	{{#> ModuleAuthForm formId="registerForm" formMethod="POST" formAction="/api/v1/register/" }}
		{{#> ModuleAuthHeader }}
			{{#> AuthTabButton }}
				{{> Link url="/login" page="auth" text="Авторизация" }}
			{{/ AuthTabButton }}
			{{#> AuthTabButton }}
				{{> Link url="/register" page="register" disabled="true" text="Регистрация" }}
			{{/ AuthTabButton }}
		{{/ ModuleAuthHeader }}

		{{#> ModuleAuthMain }}
			{{> InputField inputLabel="Почта" inputError="" inputPlaceholder="" inputName="email" inputType="email" }}
			{{> InputField inputLabel="Логин" inputError="" inputPlaceholder="" inputName="login" }}
			{{> InputField inputLabel="Имя" inputError="" inputPlaceholder="" inputName="first_name" }}
			{{> InputField inputLabel="Фамилия" inputError="" inputPlaceholder="" inputName="second_name" }}
			{{> InputField inputLabel="Телефон" inputError="" inputPlaceholder="" inputName="phone" inputType="phone" }}
			{{> InputField inputLabel="Пароль" inputError="" inputPlaceholder="" inputName="password" inputType="password" }}
			{{> InputField inputLabel="Пароль (еще раз)" inputPlaceholder="" inputError="" inputName="confirm_password" inputType="password" }}
		{{/ ModuleAuthMain }}

		{{#> ModuleAuthFooter }}
			{{> Button text="Зарегистрироваться" }}
		{{/ ModuleAuthFooter }}
	{{/ ModuleAuthForm }}
{{/ Dialog }}
`;
