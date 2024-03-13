import './index.styl';
export const Button = `
{{#if url}}
<a
	class="button button--link{{#if className}} {{className}}{{/if}}"
	href="{{url}}"
	page="{{page}}"
>
	{{ text }}
</a>
{{else}}
<button class="button{{#if className}} {{className}}{{/if}}">
	{{ text }}
</button>
{{/if}}
`;
