import './index.styl';
export const ChatAvatar = `
<div class="chat-avatar{{#if mod}} chat-avatar--{{mod}}{{/if}}">
	{{#if url}} <img src="{{url}}" alt="{{alt}}"> {{/if}}
</div>
`;
