import { METHODS } from './Enums.ts';
import {TRequest, TOptions} from '../types';

function queryStringify(data: Record<string, unknown>): string {
  let query = '?';
  for (const key in data) {
    const value = data[key];
    if (Array.isArray(value)) {
      query += `${key}=${value.join(',')}&`;
    } else if (typeof value === 'object' && value !== null) {
      query += `${key}=${JSON.stringify(value)}&`;
    } else {
      query += `${key}=${value}&`;
    }
  }
  return query.slice(0, -1);
}

export default class Request {
  public get: TRequest = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.Get }, options.timeout);
  };

  public post: TRequest = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.Post }, options.timeout);
  };

  public put: TRequest = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.Put }, options.timeout);
  };

  public delete: TRequest = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.Delete }, options.timeout);
  };

  request = (url: string, options: TOptions, timeout: number = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.Get && data) {
        xhr.open(method, `${url}${queryStringify(data as Record<string, unknown>)}`);
      } else if (method) {
        xhr.open(method, url);
      }

      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }

      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.timeout = timeout;
      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.Get) {
        xhr.send();
      } else if (data) {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  };
}
