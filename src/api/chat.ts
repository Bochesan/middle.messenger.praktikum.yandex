import Request from '../tools/Requests.ts';
import {
  EntityResponse, TAddUsers, TCreateChat, TDeleteChat, TDeleteUsers
} from './types';

const request = new Request();

export default class ChatApi {
  async getChats(): EntityResponse<never> {
    return request.get('/chats/');
  }

  async createChat(data: TCreateChat): EntityResponse<never> {
    return request.post('/chats/', {data});
  }

  async deleteChat(data: TDeleteChat): EntityResponse<never> {
    return request.delete('/chats/', {data});
  }

  async addUsers(data: TAddUsers): EntityResponse<never> {
    return request.put('/chats/users', {data});
  }

  async deleteUsers(data: TDeleteUsers): EntityResponse<never> {
    return request.delete('/chats/users', {data});
  }

  async getChatToken(id: number) {
    return request.post(`/chats/token/${id}`);
  }

  async getChatUsers(id: number): EntityResponse<never> {
    return request.get(`/chats/${id}/users`);
  }
}
