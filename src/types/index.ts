export type TProps = Record<string, any>;

export type TOptions = {
  method?: string;
  headers?: Record<string, unknown>;
  data?: unknown;
  timeout?: number;
};

export type TRequest = (url: string, options?: TOptions) => Promise<any>

export type TMessage = {
  chat_id: number;
  content: string;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}
