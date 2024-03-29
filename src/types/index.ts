export type TProps = Record<string, any>;

export type TOptions = {
  method?: string;
  headers?: Record<string, string>;
  data?: unknown;
  timeout?: number;
};

export type TRequest = (url: string, options?: TOptions) => Promise<unknown>
