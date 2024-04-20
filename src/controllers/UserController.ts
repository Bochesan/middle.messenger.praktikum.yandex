import {store} from '../store';
import UserApi from '../api/user.ts';
import {EntityResponse, TPassword, TUser} from '../api/types';
import router from '../router';

const userApi = new UserApi();

class UserController {
  public async edit(formData: TUser): EntityResponse<never> {
    return await userApi
      .edit(formData)
      .then(data => {
        if (data.response?.reason) {
          return alert(data.response.reason);
        }
        store.set({user: data.response});
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async changePWD(formData: TPassword): EntityResponse<never> {
    return await userApi
      .changePWD(formData)
      .then(data => {
        if (data.response?.reason) {
          return alert(data.response.reason);
        }
        router.back();
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async changeAvatar(formData: object): EntityResponse<never> {
    return await userApi
      .changeAvatar(formData)
      .then(data => {
        if (data.status === 200) {
          store.set({user: data.response});
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
export const userApiController = new UserController();
