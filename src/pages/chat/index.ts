export const ChatPage = `
{{#> ModuleChatDialog }}
	{{#> ModuleChatAside searchPlaceholder="поиск" settingsTitle="Профиль" }}
		{{> ChatItem chatItemTitle="Home" chatItemSubtitle="Lorem ipsum dolor sit amet, consectetur." chatItemDate="20.03" }}
		{{> ChatItem chatItemTitle="Work" chatItemSubtitle="Lorem ipsum dolor sit." chatItemDate="23.03" chatItemCount="1" }}
		{{> ChatItem chatItemTitle="Home" chatItemSubtitle="Lorem ipsum dolor sit amet, consectetur." chatItemDate="20.03" }}
		{{> ChatItem chatItemTitle="Work" chatItemSubtitle="Lorem ipsum dolor sit." chatItemDate="23.03" chatItemCount="3" }}
		{{> ChatItem chatItemTitle="Home" chatItemSubtitle="Lorem ipsum dolor sit amet, consectetur." chatItemDate="20.03" }}
		{{> ChatItem chatItemTitle="Work" chatItemSubtitle="Lorem ipsum dolor sit." chatItemDate="23.03" }}
		{{> ChatItem chatItemTitle="Home" chatItemSubtitle="Lorem ipsum dolor sit amet, consectetur." chatItemDate="20.03" }}
		{{> ChatItem chatItemTitle="Work" chatItemSubtitle="Lorem ipsum dolor sit." chatItemDate="23.03" }}
		{{> ChatItem chatItemTitle="Home" chatItemSubtitle="Lorem ipsum dolor sit amet, consectetur." chatItemDate="20.03" }}
		{{> ChatItem chatItemTitle="Work" chatItemSubtitle="Lorem ipsum dolor sit." chatItemDate="23.03" }}
		{{> ChatItem chatItemTitle="Home" chatItemSubtitle="Lorem ipsum dolor sit amet, consectetur." chatItemDate="20.03" }}
		{{> ChatItem chatItemTitle="Work" chatItemSubtitle="Lorem ipsum dolor sit." chatItemDate="23.03" }}
		{{> ChatItem chatItemTitle="Home" chatItemSubtitle="Lorem ipsum dolor sit amet, consectetur." chatItemDate="20.03" }}
		{{> ChatItem chatItemTitle="Work" chatItemSubtitle="Lorem ipsum dolor sit." chatItemDate="23.03" }}
	{{/ ModuleChatAside }}
	{{#> ModuleChatMain }}
		{{> ChatLayout emptyMessage="Выберите, кому хотели написать"}}
	{{/ ModuleChatMain }}
{{/ ModuleChatDialog }}
`;
