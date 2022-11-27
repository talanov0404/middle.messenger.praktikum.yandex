import { Methods } from '../const';

function queryStringify(data: Record<string, any>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  return Object.entries(data).reduce((prev, [key, value]) => (
    !prev ? `?${key}=${value}` : `${prev}&${key}=${value}`), '');
}

export default class HTTPTransport {
  GET = (url: string, options: Record<string, any> = {}) => {
    let newUrl = url;
    if (options.data) {
      newUrl = url + queryStringify(options.data);
    }
    return this.request(newUrl, { ...options, method: Methods.Get }, options.timeout);
  };

  PUT = (url: string, options: Record<string, any> = {}) => (
    this.request(url, { ...options, method: Methods.Put }, options.timeout));

  POST = (url: string, options: Record<string, any> = {}) => (
    this.request(url, { ...options, method: Methods.Post }, options.timeout));

  DELETE = (url: string, options: Record<string, any> = {}) => (
    this.request(url, { ...options, method: Methods.Delete }, options.timeout));

  request = (url: string, options: Record<string, any>, timeout = 5000) => {
    const { headers = {}, method, data }: Record<string, any> = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.entries(headers).forEach(([key, value]) => {
        if (typeof value === 'string') {
          xhr.setRequestHeader(key, value);
        }
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === Methods.Get || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
