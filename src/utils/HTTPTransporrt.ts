import { Methods } from '../const';

type Options = Record<string, any>;
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

function queryStringify(data: Record<string, any>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  return Object.entries(data).reduce((prev, [key, value]) => (
    !prev ? `?${key}=${value}` : `${prev}&${key}=${value}`), '');
}

export default class HTTPTransport {
  GET: HTTPMethod = (url, options = {}) => {
    let newUrl = url;
    if (options.data) {
      newUrl = url + queryStringify(options.data);
    }
    return this.request(newUrl, { ...options, method: Methods.Get }, options.timeout);
  };

  PUT: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.Put }, options.timeout));

  POST: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.Post }, options.timeout));

  DELETE: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.Delete }, options.timeout));

  request = (url: string, options: Options, timeout = 5000) => {
    const { headers = {}, method, data }: Options = options;

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
