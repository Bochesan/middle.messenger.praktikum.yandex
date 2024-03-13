import './index.styl';
export const Link = `
<a
	href="{{ url }}"
	class="link {{#if className}} {{className}}{{/if}}"
	{{#if disabled}} disabled="{{disabled}}"
	{{/if}} page="{{ page }}"
>
	{{ text }}
</a>
`;
