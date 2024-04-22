import {store} from '../store';
import AuthApi from '../api/auth.ts';
import {EntityResponse, TSignin, TSignup} from '../api/types';
import {ROUTE} from '../utils/Enums.ts';
import router from '../router';

const authApi = new AuthApi();

class AuthController {
  public async signin(formData: TSignin): EntityResponse<never> {
    return await authApi
      .login(formData)
      .then(async (data) => {
        if (data.response?.reason) {
          return alert(data.response.reason);
        }
        await this.getUser();
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async signup(formData: TSignup) {
    return await authApi
      .register(formData)
      .then(async (data) => {
        if (data.response?.reason) {
          return alert(data.response.reason);
        }
        await this.getUser();
        router.go(ROUTE.Chat);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public async getUser() {
    return await authApi
      .getUser()
      .then(data => {
        if (data.status === 200) {
          store.set({user: data.response});
          switch (location.pathname) {
            case ROUTE.Auth:
            case ROUTE.Register:
              return router.go(ROUTE.Chat);
          }
        } else {
          switch (location.pathname) {
            case ROUTE.Auth:
            case ROUTE.Register:
              return router.go(location.pathname);
            default:
              return router.go(ROUTE.Auth);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  public logout() {
    return authApi
      .logout()
      .then(async () => {
        await store.reset();
        router.go(ROUTE.Auth);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
export const authApiController = new AuthController();
