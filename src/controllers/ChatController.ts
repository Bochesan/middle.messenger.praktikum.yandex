import {store} from '../store';
import {EntityResponse, TAddUsers, TCreateChat, TDeleteChat, TDeleteUsers} from '../api/types';
import ChatApi from '../api/chat.ts';

const chatApi = new ChatApi();

class ChatController {

  public async getChats(): EntityResponse<never> {
    return await chatApi
      .getChats()
      .then(async (data) => {
        console.log('store.getState() ', store.getState());
        if (data.status === 200 && data.response.length !== 0) {
          console.log('data ', data);
          store.set({chats: data.response});
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async getChatToken(id: number) {
    return await chatApi
      .getChatToken(id)
      .then(data => {
        store.set({token: data.response.token});
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async createChat(formData: TCreateChat): EntityResponse<never> {
    return await chatApi
      .createChat(formData)
      .then(async (data) => {
        if (data.status === 200 && data.response.length !== 0) {
          store.set({modal: null});
          await this.getChats();
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async deleteChat(formData: TDeleteChat): EntityResponse<never> {
    return await chatApi
      .deleteChat(formData)
      .then(async (data) => {
        if (data.status === 200 && data.response.length !== 0) {
          store.set({chat: {
              id: null
            }});
          await this.getChats();
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async addUsers(formData: TAddUsers): EntityResponse<never> {
    return await chatApi
      .addUsers(formData)
      .then(() => {
        this.getChatUsers(formData.chatId);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async deleteUsers(formData: TDeleteUsers): EntityResponse<never> {
    return await chatApi
      .deleteUsers(formData)
      .then(() => {
        this.getChatUsers(formData.chatId);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async getChatUsers(id: number) {
    return await chatApi
      .getChatUsers(id)
      .then(data => {
        store.set({chatUsers: data.response });
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
export const chatApiController = new ChatController();
