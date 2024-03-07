export const RegisterPage = `
{{#> Dialog }}
	{{#> ModuleAuthForm formId="registerForm" formMethod="POST" formAction="/api/v1/register/" }}
		{{#> ModuleAuthHeader }}
			{{#> AuthTabButton }}
				{{> Link url="/login" page="auth" text="Войти" }}
			{{/ AuthTabButton }}
			{{#> AuthTabButton }}
				{{> Link url="/register" page="register" disabled="true" text="Регистрация" }}
			{{/ AuthTabButton }}
		{{/ ModuleAuthHeader }}

		{{#> ModuleAuthMain }}
			{{> InputField inputLabel="Почта" inputError="" inputPlaceholder="" inputName="EMAIL" inputType="email" }}
			{{> InputField inputLabel="Логин" inputError="" inputPlaceholder="" inputName="LOGIN" }}
			{{> InputField inputLabel="Имя" inputError="" inputPlaceholder="" inputName="NAME" }}
			{{> InputField inputLabel="Фамилия" inputError="" inputPlaceholder="" inputName="SECONDNAME" }}
			{{> InputField inputLabel="Телефон" inputError="" inputPlaceholder="" inputName="PHONE" inputType="phone" }}
			{{> InputField inputLabel="Пароль" inputError="" inputPlaceholder="" inputName="PWD" inputType="password" }}
			{{> InputField inputLabel="Пароль (еще раз)" inputPlaceholder="" inputError="" inputName="SECONDPWD" inputType="password" }}
		{{/ ModuleAuthMain }}

		{{#> ModuleAuthFooter }}
			{{> Button text="Зарегистрироваться" }}
		{{/ ModuleAuthFooter }}
	{{/ ModuleAuthForm }}
{{/ Dialog }}
`;
