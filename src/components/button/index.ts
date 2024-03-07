import './index.styl';
export const Button = `
<button class="button{{#if className}} {{className}}{{/if}}">
	{{ text }}
</button>
`;
