import './index.styl';
export const ModuleError = `
<div class="error">
	<div class="error__code">{{ errorCode }}</div>
	<div class="error__message">{{ errorMessage }}</div>
	<div class="error__footer">
		{{> @partial-block }}
	</div>
</div>
`;
