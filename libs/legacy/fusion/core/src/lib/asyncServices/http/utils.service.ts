import { Observable } from 'rxjs';
import {
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpClient,
} from '@angular/common/http';
import { map, catchError, take, switchMap } from 'rxjs/operators';

import { HttpService } from './http.service';
import { TokenModel, SecurityContext } from '@zhealthcare/fusion/models';
import { OrgState } from './../../store/reducers/org.reducers';
import { Type } from '@angular/core';
import { Cryptography } from '../../helper/cryptography/encryption';
import {
  HttpConstants,
  MetaConstants,
  MethodType,
  URLConstants,
} from '../../helper/constants';
import { OucodeHelper } from '../../helper/oucodes/oucode-helper';
import { RequestHeader } from '../../helper/requestheader/requestheader';


export function methodBuilder(method: string) {
  return function <T>(url: string) {
    return function (
      target: HttpService,
      propertyKey: string,
      descriptor: any
    ) {
      return getDescriptor<T>(target, propertyKey, descriptor, url, method);
    };
  };
}

export function postMethodBuilder(method: string) {
  return function <T>(url: string, securityContextType: Type<SecurityContext>) {
    return function (
      target: HttpService,
      propertyKey: string,
      descriptor: any
    ) {
      return getDescriptor<T>(target, propertyKey, descriptor, url, method);
    };
  };
}

function getDescriptor<T>(
  target: HttpService,
  propertyKey: string,
  descriptor: any,
  url: string,
  method: string
) {
  const pPath = target[`${propertyKey}_Path_parameters`],
    dQuery = target[`${propertyKey}_Dynamic_parameters`],
    pQuery = target[`${propertyKey}_Query_parameters`],
    pBody = target[`${propertyKey}_Body_parameters`],
    pHeader = target[`${propertyKey}_Header_parameters`];

  descriptor.value = function (...args: any[]) {
    const body: T = createBody<T>(pBody, descriptor, args);
    let resUrl: string = createPath(url, pPath, args);
    resUrl = createDynamic(resUrl, dQuery, args);
    const search: HttpParams = createQuery(pQuery, args);
    let headers: HttpHeaders = createHeaders(
      pHeader,
      descriptor,
      this.getDefaultHeaders(),
      args
    );
    const httpClient: HttpClient = this.httpClient;
    // Request Interceptor
    headers = RequestHeader.setDefaultHeaders(headers);
    let observable: Observable<HttpResponse<T>>;
    if (
      localStorage.getItem('Authorization') === 'Off' &&
      this.configService.configuration.production === false
    ) {
      observable = handleAuthOffRequest<T>(
        headers,
        httpClient,
        method,
        resUrl,
        body,
        search
      );
    } else if (sessionStorage.getItem('IsDelegateUser') === 'true') {
      var _this = this;
      observable = handleDelegatorRequest<T>(
        headers,
        httpClient,
        method,
        resUrl,
        body,
        search,
        _this
      );
    } else {
      // Authorization Token
      observable = this.userFacade.AuthState$.pipe(
        map((tokenModel: TokenModel) => {
          headers = RequestHeader.setTokenHeader(tokenModel, headers);
        }),
        take(1),
        switchMap((_) => {
          return this.orgFacade.OrgState$;
        }),
        map((orgState: OrgState) => {
          headers = setSecurityHeader<T>(orgState, headers, method, body);
          //This line is temperarily commented - need to fix this delete body["securityContext"];
        }),
        take(1),
        switchMap(() => {
          const baseUrl = this.getEndpoint(this.getBaseUrl());
          let requestBody: any = body;
          if (this.encryptionEnabled) {
            requestBody = Cryptography.encryptRequest<T>(
              body,
              this.configService
            );
          }
          if (
            !isEmpty(localStorage.getItem('Auth')) &&
            (isEmpty(localStorage.getItem(MetaConstants.FACILITYID)) ||
              isEmpty(localStorage.getItem(MetaConstants.OUCODES))) &&
            headers['TenantId'] !== HttpConstants.BASE &&
            !this.router.url.includes('launch') &&
            !['/', '/account/login', '/userConsent'].includes(this.router.url)
          ) {
            this._snackbarService.openCustomSnackBar(
              { message: 'Please select the tenant and program.' },
              5000,
              '',
              'bottom'
            );
            this.router.navigateByUrl(`${URLConstants.LAUNCH_URL}`);
          }
          return httpClient
            .request<T>(method, baseUrl + resUrl, {
              body: requestBody,
              headers: headers,
              params: search,
              observe: 'response',
              responseType: 'json'
            })
            .pipe(
              map((response) => {
                this.userFacade.updateUserLastActivityTime();
                return response;
              }),
              catchError((error, source) =>
                this.httpResponseHandler.onCatch(error, source)
              )
            );
        })
      );
    }
    // Response Interceptor
    return observable.pipe(
      map((res) => {
        this.httpResponseHandler.handleActonResponse(res.body);
        return res.body;
      })
    );
  };
  return descriptor;
}

function isEmpty(item: string) {
  return item === null || item === undefined || item === '';
}

function setSecurityHeader<T>(
  orgState: OrgState,
  headers: HttpHeaders,
  method: string,
  body: T
) {
  let oucodesArray: string[] = [];
  if (orgState !== undefined) {
    oucodesArray = OucodeHelper.getOucodeList(
      oucodesArray,
      orgState.FacilityWiseStatuses.StatusCount,
      orgState.FacilityWiseStatuses.FacilityId === HttpConstants.BASE
        ? false
        : true
    );
    if (orgState.FacilityWiseStatuses.FacilityId === HttpConstants.BASE) {
      oucodesArray = orgState.FacilityWiseStatuses.StatusCount.map(
        (x) => x.status
      );
    } else {
      oucodesArray = orgState.FacilityWiseStatuses.StatusCount.filter(
        (x) => x.isSelected
      ).map((x) => x.status);
    }
    oucodesArray = oucodesArray.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    headers = RequestHeader.setFacilityAndStatusHeader(
      headers,
      orgState,
      oucodesArray
    );
  }
  if (method === MethodType.POST) {
    headers = RequestHeader.setSecurityContextHeader<T>(
      body,
      headers,
      oucodesArray
    );
  }
  return headers;
}

function handleAuthOffRequest<T>(
  headers: HttpHeaders,
  httpClient: HttpClient,
  method: string,
  resUrl: string,
  body: T,
  search: HttpParams
) {
  headers = headers.set('Authorization', 'Off');
  const baseUrl = this.getEndpoint(this.getBaseUrl());

  if (!headers.has('TenantId'))
    headers = headers.set('TenantId', localStorage.getItem('TenantId'));
  return httpClient.request<T>(method, baseUrl + resUrl, {
    body: body,
    headers: headers,
    params: search,
    observe: 'response',
    responseType: 'json',
  });
}

function handleDelegatorRequest<T>(
  headers: HttpHeaders,
  httpClient: HttpClient,
  method: string,
  resUrl: string,
  body: T,
  search: HttpParams,
  _this: any
) {
  const baseUrl = _this.getEndpoint(_this.getBaseUrl());
  const tokenModel: TokenModel = JSON.parse(sessionStorage.getItem('Auth'));
  headers = RequestHeader.setTokenHeader(tokenModel, headers);
  var observable: Observable<HttpResponse<T>> = _this.orgFacade.OrgState$.pipe(
    map((orgState: OrgState) => {
      headers = setSecurityHeader<T>(orgState, headers, method, body);
      //This line is temperarily commented - need to fix this delete body["securityContext"];
    }),
    take(1),
    switchMap(() => {
      let requestBody: any = body;
      if (_this.encryptionEnabled) {
        requestBody = Cryptography.encryptRequest<T>(body, _this.configService);
      }
      return httpClient
        .request<T>(method, baseUrl + resUrl, {
          body: requestBody,
          headers: headers,
          params: search,
          observe: 'response',
          responseType: 'json',
        })
        .pipe(
          map((response) => {
            _this.userFacade.updateUserLastActivityTime();
            // this.httpResponseHandler.handleTokenRenew(response);
            return response;
          }),
          catchError((error, source) =>
            _this.httpResponseHandler.onCatch(error, source)
          )
        );
    })
  );
  return observable;
}

export function paramBuilder(paramName: string) {
  return function (key: string) {
    return function (
      target: HttpService,
      propertyKey: string,
      parameterIndex: number
    ) {
      const metadataKey = `${propertyKey}_${paramName}_parameters`;

      const paramObj: any = {
        key: key,
        parameterIndex: parameterIndex,
      };

      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
}

/////////////////////////////////////////////////////////////////
//////////////////// dynamic builder ///////////////////////////
////////////////////////////////////////////////////////////////

function createBody<T>(
  pBody: Array<any>,
  descriptor: any,
  args: Array<any>
): T {
  if (descriptor.isFormData) {
    return args[0];
  }
  return pBody ? args[pBody[0].parameterIndex] : null;
}

function createPath(url: string, pPath: Array<any>, args: Array<any>): string {
  let resUrl: string = url;

  if (pPath) {
    for (const k of pPath) {
      const index = pPath.indexOf(k);
      if (pPath.hasOwnProperty(index)) {
        resUrl = resUrl.replace(
          `{${pPath[index].key}}`,
          args[pPath[index].parameterIndex]
        );
      }
    }
  }

  return resUrl;
}

function createDynamic(
  url: string,
  dQuery: Array<any>,
  args: Array<any>
): string {
  let queryUrl: string = url;

  if (dQuery) {
    for (const k of dQuery) {
      const index = dQuery.indexOf(k);
      if (dQuery.hasOwnProperty(index)) {
        queryUrl = queryUrl.replace(
          `{${dQuery[index].key}}`,
          args[dQuery[index].parameterIndex]
        );
      }
    }
  }

  return queryUrl;
}

function createQuery(pQuery: any, args: Array<any>): HttpParams {
  let search = new HttpParams();

  if (pQuery) {
    pQuery
      .filter((p) => args[p.parameterIndex]) // filter out optional parameters
      .forEach((p) => {
        const key = p.key;
        let value = args[p.parameterIndex];
        // if the value is a instance of Object, we stringify it
        if (Array.isArray(value)) {
          value.forEach((x) => {
            search = search.append(key, x);
          });
        } else {
          if (value instanceof Object) {
            value = JSON.stringify(value);
          }
          search = search.append(key, value);
        }
      });
  }

  return search;
}

function createHeaders(
  pHeader: any,
  descriptor: any,
  defaultHeaders: any,
  args: Array<any>
): HttpHeaders {
  let headers = new HttpHeaders(defaultHeaders);

  // set method specific headers
  for (const k in descriptor.headers) {
    setMethodSpecificHeader(k);
  }

  // set parameter specific headers
  if (pHeader) {
    for (const k in pHeader) {
      setPatamaterSpecificHeader(k);
    }
  }
  return headers;

  function setPatamaterSpecificHeader(k: string) {
    if (pHeader.hasOwnProperty(k)) {
      if (headers.has(k)) {
        headers = headers.delete(k);
      }
      headers = headers.set(pHeader[k].key, args[pHeader[k].parameterIndex]);
    }
  }

  function setMethodSpecificHeader(k: string) {
    if (descriptor.headers.hasOwnProperty(k)) {
      if (headers.has(k)) {
        headers = headers.delete(k);
      }
      headers = headers.append(k, descriptor.headers[k]);
    }
  }
}
