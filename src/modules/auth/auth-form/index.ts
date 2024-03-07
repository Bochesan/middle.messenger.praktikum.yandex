import './index.styl';
export const ModuleAuthForm = `
<form class="auth-form" id="{{ formId }}" method="{{ formMethod }}" action="{{ formAction }}">
	{{> @partial-block }}
</form>
`;
