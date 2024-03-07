import './index.styl';
export const ChatItem = `
<div class="chat-item">
	<div class="chat-item__avatar">
		{{> ChatAvatar }}
	</div>
	<div class="chat-item__main">
		<div class="chat-item__note">
			<div class="chat-item__title">{{ chatItemTitle }}</div>
			{{#if chatItemSubtitle}}<div class="chat-item__subtitle">{{ chatItemSubtitle }}</div>{{/if}}
		</div>
		<div class="chat-item__info">
			<div class="chat-item__date">{{ chatItemDate }}</div>
			{{#if chatItemCount}}<div class="chat-item__count">{{ chatItemCount }}</div>{{/if}}
		</div>
	</div>
</div>
`;
