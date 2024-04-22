import {authApiController} from '../controllers/AuthController.ts';
import {chatApiController} from '../controllers/ChatController.ts';
import {store} from '../store';


export const middlewareAuth = async () => {
  await authApiController.getUser().then( async () => {
    if (store.getState().user.id) {
      await chatApiController.getChats();
    }
  });

};
