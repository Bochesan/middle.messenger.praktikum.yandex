import Request from '../tools/Requests.ts';
import {
  EntityResponse, TPassword, TUser,
} from './types';

const request = new Request();

export default class UserApi {
  async edit(data: TUser): EntityResponse<never> {
    return request.put('/user/profile', {data});
  }

  async changePWD(data: TPassword): EntityResponse<never> {
    return request.put('/user/password', {data});
  }

  async changeAvatar(data: object) {
    const headers = {};
    return request.put('/user/profile/avatar', { data, headers });
  }
}
