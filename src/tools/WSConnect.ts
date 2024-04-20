import {store} from '../store';

declare global {
  interface Window {
    socket?: WebSocket;
  }
}

export const WSConnect = async () => {
  const userId = store.getState().user.id;
  const chatId = store.getState().chat.id;
  const token = store.getState().token;
  const WSPath = `${userId}/${chatId}/${token}`;
  const socket = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${WSPath}`
  );

  socket.addEventListener('open', () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        })
      );
    }
  });

  const ping = setInterval(() => {
    socket?.send(JSON.stringify({ type: 'ping' }));
  }, 10000);

  socket.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        store.set({messages: data});
      }
      if (data.type === 'message') {
        const messages = store.getState().messages;
        data.time = new Date().toISOString();

        store.set({messages: [data, ...messages]});
      }
    } catch (error) {
      throw new Error('Message error');
    }
  });

  socket.addEventListener('close', () => {
    clearInterval(ping);
  });

  window.socket = socket;

  return socket;
};
