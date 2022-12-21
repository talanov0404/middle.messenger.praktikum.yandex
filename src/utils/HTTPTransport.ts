import { Methods } from '../const';

type Options = {
  method: Methods;
  data?: any;
};

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<R>(path = '/') {
    const url = this.endpoint + path;
    return this.request<R>(url, { method: Methods.Get });
  }

  public put<R>(path: string, data?: unknown) {
    const url = this.endpoint + path;
    return this.request<R>(url, { data, method: Methods.Put });
  }

  public post<R>(path: string, data?: unknown) {
    const url = this.endpoint + path;
    return this.request<R>(url, { data, method: Methods.Post });
  }

  public patch<R>(path: string, data?: unknown) {
    const url = this.endpoint + path;
    return this.request<R>(url, { data, method: Methods.Patch });
  }

  public delete<R>(path: string, data?: unknown) {
    const url = this.endpoint + path;
    return this.request<R>(url, { data, method: Methods.Delete });
  }

  private request<R>(url: string, options: Options = { method: Methods.Get }): Promise<R> {
    const { method, data }: Options = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      const reasonAbort = { reason: 'abort' };
      const reasonNetwork = { reason: 'network error' };
      const reasonTimeout = { reason: 'timeout' };

      xhr.onabort = () => reject(reasonAbort);
      xhr.onerror = () => reject(reasonNetwork);
      xhr.ontimeout = () => reject(reasonTimeout);

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Methods.Get || !data) {
        xhr.send();
      } else if ((data instanceof FormData)) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
