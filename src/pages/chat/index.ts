import './index.styl';
import Block from '../../tools/Block.ts';
import {ChatCreate, ChatItem, ChatLayout, ChatList, Logout, SearchForm, Settings} from '../../components';
import {store, StoreEvents} from '../../store';
import {IChatItem} from '../../api/types';
import {chatApiController} from '../../controllers/ChatController.ts';

const template = `
<div class="chat-dialog">
  <div class="chat-aside">
    <div class="chat-aside__header">
      {{{ UserLogout }}}
      {{{ UserSettings }}}
      {{{ UserChatCreate }}}
    </div>
    <div class="chat-aside__main">
      {{{ ChatItems }}}
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
  ChatLayout: Block
}

export class ChatPage extends Block {
  constructor(props: IProps) {
    super({
      ...props,

      searchPlaceholder: 'Search',
      settingsTitle: 'Профиль',

      Chat: new ChatLayout(),

      UserLogout: new Logout(),
      UserSettings: new Settings(),
      UserChatCreate: new ChatCreate(),

      ChatItems: new ChatList({
        chats: null
      }),

      ChatSearch: new SearchForm({
        inputName: 'search',
        placeholder: 'Поиск'
      })
    });
  }

  createChatItems(chats: Array<IChatItem> | null) {
    if (chats !== null) {
      return chats.map((chat: IChatItem) => new ChatItem(chat));
    }
  }

  async componentDidMount() {
    await chatApiController.getChats();
    this.children.ChatItems.setProps({chats: this.createChatItems(store.getState().chats)});
    store.on(StoreEvents.Updated, () => this.children.ChatItems.setProps({chats: this.createChatItems(store.getState().chats)}));
  }

  render() {
    return this.compile(template, this.props);
  }
}

