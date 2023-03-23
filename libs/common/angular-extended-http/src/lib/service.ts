import {
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';

import { ExtendedHttpInterceptor } from './typings';

@Injectable({ providedIn: 'root' })
export class ExtendedHttpProvider {
  private interceptors: ExtendedHttpInterceptor[] = [];

  getInterceptors() {
    return this.interceptors;
  }

  addInterceptor(interceptor: ExtendedHttpInterceptor): this {
    this.interceptors.push(interceptor);
    return this;
  }

  addRequestInterceptor(
    interceptor: (res: HttpRequest<any>) => HttpRequest<any>
  ): ExtendedHttpProvider {
    return this.addInterceptor({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        return interceptor(request) || request;
      },
    });
  }

  addResponseInterceptor(
    interceptor: (res: any, request?: HttpRequest<any>) => any
  ): ExtendedHttpProvider {
    return this.addInterceptor({
      response: (
        response: HttpEvent<any> | HttpErrorResponse,
        request?: HttpRequest<any>
      ): HttpEvent<any> | void => {
        return interceptor(response, request) || response;
      },
    });
  }

  addResponseErrorInterceptor(
    interceptor: (res: any, request?: HttpRequest<any>) => any
  ): ExtendedHttpProvider {
    return this.addInterceptor({
      response: (
        response: HttpEvent<any> | HttpErrorResponse,
        request?: HttpRequest<any>
      ): HttpEvent<any> | void => {
        if (response instanceof HttpErrorResponse) {
          return interceptor(response, request) || response;
        }
      },
    });
  }

  handleRequest(req: HttpRequest<any>): HttpRequest<any> {
    return this.interceptors
      .filter((item) => !!item.request)
      .reduce((httpEvent, item) => {
        return item.request?.(httpEvent) || httpEvent;
      }, req);
  }

  handleResponse(
    response: HttpEvent<any>,
    request?: HttpRequest<any>
  ): HttpEvent<any> {
    return this.interceptors
      .filter((item) => !!item.response)
      .reverse()
      .reduce((httpEvent, item) => {
        return item.response?.(httpEvent, request) || httpEvent;
      }, response);
  }

  baseUrl(host: string, excludes: RegExp[] = []): ExtendedHttpProvider {
    this.interceptors.push({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        if (/^https?:/.test(request.url)) {
          return request;
        }

        const excludeUrl = excludes.some((t) => t.test(request.url));
        if (excludeUrl) {
          return request;
        }

        host = host.replace(/\/$/, '');
        const url = request.url.replace(/^\//, '');
        return request.clone({ url: `${host}/${url}` });
      },
    });

    return this;
  }

  headers(
    headers: { [name: string]: string | string[] } = {},
    override = false
  ): ExtendedHttpProvider {
    return this.addInterceptor({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        let result = headers;
        if (request.headers) {
          result = Object.keys(headers).reduce((obj, key) => {
            if (override || !request.headers.has(key)) {
              obj[key] = headers[key];
            }
            return obj;
          }, {} as any);
        }

        return request.clone({ setHeaders: result });
      },
    });
  }
}

export const EXTENDED_HTTP_PROVIDERS: Provider[] = [ExtendedHttpProvider];
