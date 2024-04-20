import Request from '../tools/Requests.ts';
import {
  TSignin, EntityResponse, TSignup,
} from './types';

const request = new Request();

export default class AuthApi {
  async login(data: TSignin): EntityResponse<never> {
    return request.post('/auth/signin', {data});
  }

  async register(data: TSignup): EntityResponse<never> {
    return request.post('/auth/signup', {data});
  }

  async logout(): EntityResponse<never> {
    return request.post('/auth/logout');
  }

  async getUser(): EntityResponse<never> {
    return request.get('/auth/user');
  }
}
