import './index.styl';
import Block from '../../tools/Block.ts';
import {ChatItem, ChatLayout, SearchForm} from '../../components';
const template = `
<div class="chat-dialog">
  <div class="chat-aside">
    {{{ ChatSearch }}}
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
    {{{ Chat }}}
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
      settingsTitle: 'Профиль',

      Chat: new ChatLayout({
        emptyMessage: 'Напишите первым',
        messages: '1'
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
      ],

      ChatSearch: new SearchForm({
        inputName: 'search',
        placeholder: 'Поиск'
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

