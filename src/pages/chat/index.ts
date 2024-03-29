import './index.styl';
import Block from '../../tools/Block.ts';
import {ChatItem, ChatLayout} from '../../components';
const template = `
<div class="chat-dialog">
  <div class="chat-aside">
    <form class="chat-aside__search">
      <input class="chat-aside__search-input" type="text" placeholder="{{ searchPlaceholder }}">
    </form>
    <div class="chat-aside__main">
      {{{ lists }}}
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
  <div class="chat-main">
    {{{ ChatLayout }}}
  </div>
</div>
`;

interface IProps {
  searchPlaceholder?: string
  settingsTitle?: string
  chats?: Array<Block>
  ChatLayout: Block
}

export class ChatPage extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      searchPlaceholder: 'Search',
      settingsTitle: 'Settings',

      ChatLayout: new ChatLayout({
        emptyMessage: 'Empty'
      }),

      lists: [
        new ChatItem({
          chatItemAvatar: '/upload/avatar.jpg',
          chatItemTitle: 'Chat name',
          chatItemSubtitle: 'Chat subtitle',
          chatItemDate: '20.01.2077',
          chatItemCount: 3
        }),
        new ChatItem({
          chatItemAvatar: '',
          chatItemTitle: 'Chat name',
          chatItemSubtitle: 'Chat subtitle',
          chatItemDate: '20.01.2077',
          chatItemCount: null
        }),
        new ChatItem({
          chatItemAvatar: '/upload/avatar-2.jpeg',
          chatItemTitle: 'Chat name',
          chatItemSubtitle: 'Chat subtitle',
          chatItemDate: '20.01.2077',
          chatItemCount: null
        }),
        new ChatItem({
          chatItemAvatar: '/upload/avatar-3.jpeg',
          chatItemTitle: 'Chat name',
          chatItemSubtitle: 'Chat subtitle',
          chatItemDate: '20.01.2077',
          chatItemCount: 1
        }),
        new ChatItem({
          chatItemAvatar: '',
          chatItemTitle: 'Chat name',
          chatItemSubtitle: 'Chat subtitle',
          chatItemDate: '20.01.2077',
          chatItemCount: null
        }),
      ]



    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

