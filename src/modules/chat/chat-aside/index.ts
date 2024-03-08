import './index.styl';
export const ModuleChatAside = `
<div class="chat-aside">
	<form class="chat-aside__search">
		<input class="chat-aside__search-input" type="text" placeholder="{{ searchPlaceholder }}">
	</form>
	<div class="chat-aside__main">
		{{> @partial-block }}
	</div>
	<div class="chat-aside__footer">
		<a href="/profile" class="chat-aside__settings">
			<div class="chat-aside__settings-icon">
				<img src="/media/icons/icon-settings.svg" alt="icon-settings">
			</div>
			<div class="chat-aside__settings-title">{{ settingsTitle }}</div>
		</a>
	</div>
</div>
`;
