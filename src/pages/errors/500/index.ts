export const Error500 = `
{{#> Dialog }}
	{{#>
		ModuleError
		errorCode="500"
		errorMessage="Мы уже фиксим"
	}}
		{{> Button text="Назад к чатам" url="/" page="auth" }}
	{{/ ModuleError }}
{{/ Dialog }}
`;
