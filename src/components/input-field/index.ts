import './index.styl';
export const InputField = `
<label class="input-field{{#if className}} {{className}}{{/if}}">
	{{#if inputLabel}}<span class="input-field__title">{{ inputLabel }}</span>{{/if}}
	<input
		class="input-field__input"
		{{#if inputType}} type="{{inputType}}" {{else}}type="text"{{/if}}
		{{#if inputPlaceholder}}placeholder="{{inputPlaceholder}}"{{/if}}
		{{#if inputName}}name="{{inputName}}"{{/if}}
		{{#if inputValue}}value="{{inputValue}}"{{/if}}
	>
	<span class="input-field__error">{{ inputError}}</span>
</label>
`;
