import './index.styl';
export const ChatLayout = `
{{#if messages}}
<div class="chat-layout">
<!--	TODO Messages-->
</div>
{{else}}
<div class="chat-layout">
	<div class="chat-layout__empty">{{ emptyMessage }}</div>
</div>
{{/if}}
`;
