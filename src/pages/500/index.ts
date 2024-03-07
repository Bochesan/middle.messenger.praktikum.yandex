export const AuthPage = `
{{#> Dialog }}
	{{#> ModuleAuthForm formId="authForm" formMethod="POST" formAction="/api/v1/login/" }}
		{{#> ModuleAuthHeader }}
			{{#> AuthTabButton }}
				{{> Link url="/login" page="auth" disabled="true" text="Войти" }}
			{{/ AuthTabButton }}
			{{#> AuthTabButton }}
				{{> Link url="/register" page="register" text="Регистрация" }}
			{{/ AuthTabButton }}
		{{/ ModuleAuthHeader }}

		{{#> ModuleAuthMain }}
			{{> InputField inputLabel="Логин" inputError="" inputName="LOGIN" }}
			{{> InputField inputLabel="Пароль" inputError="" inputName="PWD" inputType="password" }}
		{{/ ModuleAuthMain }}

		{{#> ModuleAuthFooter }}
			{{> Button text="Авторизоваться" }}
		{{/ ModuleAuthFooter }}
	{{/ ModuleAuthForm }}
{{/ Dialog }}
`;
