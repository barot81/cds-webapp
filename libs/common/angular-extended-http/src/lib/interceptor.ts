import {
  HttpEventType,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ExtendedHttpProvider } from './service';

@Injectable({ providedIn: 'root' })
export class ExtendedHttpInterceptors implements HttpInterceptor {
  constructor(private extendedHttpProvider: ExtendedHttpProvider) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const httpRequest = this.extendedHttpProvider.handleRequest(req);
    return next.handle(httpRequest).pipe(
      map((response) => {
        if (
          [HttpEventType.Response, HttpEventType.ResponseHeader].indexOf(
            response.type
          ) !== -1
        ) {
          return (
            this.extendedHttpProvider.handleResponse(response, httpRequest) ||
            response
          );
        }
        return response;
      }),
      catchError((error) =>
        throwError(
          this.extendedHttpProvider.handleResponse(error, httpRequest) || error
        )
      )
    );
  }
}
