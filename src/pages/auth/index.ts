export const AuthPage = `
{{#> Dialog }}
	{{#> ModuleAuthForm formId="authForm" formMethod="POST" formAction="/api/v1/login/" }}
		{{#> ModuleAuthHeader }}
			{{#> AuthTabButton }}
				{{> Link url="/login" page="auth" disabled="true" text="Авторизация" }}
			{{/ AuthTabButton }}
			{{#> AuthTabButton }}
				{{> Link url="/register" page="register" text="Регистрация" }}
			{{/ AuthTabButton }}
		{{/ ModuleAuthHeader }}

		{{#> ModuleAuthMain }}
			{{> InputField inputLabel="Логин" inputError="" inputName="login" }}
			{{> InputField inputLabel="Пароль" inputError="" inputName="password" inputType="password" }}
		{{/ ModuleAuthMain }}

		{{#> ModuleAuthFooter }}
			{{> Button text="Войти" }}
		{{/ ModuleAuthFooter }}
	{{/ ModuleAuthForm }}
{{/ Dialog }}
`;
