export const Error404 = `
{{#> Dialog }}
	{{#>
		ModuleError
		errorCode="404"
		errorMessage="Не туда попали"
	}}
		{{> Button text="Назад к чатам" url="/" page="auth" }}
	{{/ ModuleError }}
{{/ Dialog }}
`;
