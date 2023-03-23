/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
import {
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Cryptography,
  GET,
  HttpService,
  Logger,
  OrgState,
} from '@zhealthcare/fusion/core';
import { SecurityContext, TokenModel } from '@zhealthcare/fusion/models';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { FileDescription } from './models/fileDescription.model';
import { FileType } from './models/fileType';
import { FileUploadModel } from './models/fileUpload.model';

@Injectable({ providedIn: 'any' })
export class FileApiClient extends HttpService {
  public file_URL = '';
  public tenantId;
  constructor() {
    super();
    this.tenantId = localStorage.getItem('TenantId');
  }

  public uploadFile(
    param: string,
    target: string,
    file: FileUploadModel,
    fileType: FileType,
    filePath: string,
    securityContext: SecurityContext,
    isSecured: boolean = false,
    description: string = null,
    tag: string = null
  ): Observable<any> {
    const formData = new FormData();
    formData.append(param, file.data);

    let headers = new HttpHeaders();

    let params: HttpParams = new HttpParams();
    target = this.getEndpoint(target);
    if (description != null) params = params.append('description', description);
    params = params.append('fileType', fileType);
    params = params.append('filePath', filePath);
    if (tag != null) params = params.append('tag', tag);
    params = params.append('isSecured', isSecured.toString());

    if (securityContext !== undefined) {
      if (
        !headers.has('TargetOUcode') &&
        securityContext['owningOrganizationUnit'] !== undefined
      )
        headers = headers.append(
          'TargetOUcode',
          securityContext['owningOrganizationUnit']
        );
      if (
        !headers.has('TargetUserId') &&
        securityContext['owningUser'] !== undefined
      )
        headers = headers.append('TargetUserId', securityContext['owningUser']);
    }
    file.inProgress = true;
    let observable: Observable<any>;

    observable = this.userFacade.AuthState$.pipe(
      map((tokenModel: TokenModel) => {
        const token = tokenModel.accessToken;
        if (token) {
          headers = headers.append('Authorization', 'Bearer ' + token);
        }
      }),
      take(1),
      switchMap((_) => {
        return this.orgFacade.OrgState$;
      }),
      map((orgState: OrgState) => {
        if (orgState !== undefined) {
          if (!headers.has('TenantId')) {
            headers = headers.append(
              'TenantId',
              orgState.TenantWithOuCodeTree.TenantId
            );
          }
          if (!headers.has('Oucodes'))
            headers = this.getOucodeHeaders(
              headers,
              orgState.TenantWithOuCodeTree.OucodeTree,
              orgState.TenantWithOuCodeTree.TenantId === 'Base' ? false : true
            );
        }
      }),
      take(1),
      switchMap((_) => {
        const req = new HttpRequest('POST', target, formData, {
          headers: headers,
          params: params,
          reportProgress: true,
        });
        return this.httpClient.request<FileDescription>(req).pipe(
          map((event) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                file.progress = Math.round((event.loaded * 100) / event.total);
                break;
              case HttpEventType.Response:
                if (Array.isArray(event.body))
                  event.body[0].securityContext = securityContext;
                else event.body.securityContext = securityContext;
                return event;
            }
          }),
          catchError((error, source) => {
            file.inProgress = false;
            file.canRetry = true;
            this.httpResponseHandler.onCatch(error, source);
            Logger.error('failed at uploading file.');
            throw error;
            // return of(`${file.data.name} upload failed.`);
          })
        );
      })
    );
    return observable;
  }

  public deleteFile(
    fileKey: string,
    target: string,
    isFileKey: boolean = true
  ): Observable<any> {
    let headers = new HttpHeaders();

    let params: HttpParams = new HttpParams();
    params = params.append('isFileKey', isFileKey.toString());
    target = this.getEndpoint(target);

    return this.userFacade.AuthState$.pipe(
      map((tokenModel: TokenModel) => {
        const token = tokenModel.accessToken;
        if (token) {
          headers = headers.append('Authorization', 'Bearer ' + token);
        }
      }),
      take(1),
      switchMap((_) => {
        return this.orgFacade.OrgState$;
      }),
      map((orgState: OrgState) => {
        if (orgState !== undefined) {
          if (!headers.has('TenantId')) {
            headers = headers.append(
              'TenantId',
              orgState.TenantWithOuCodeTree.TenantId
            );
          }
          if (!headers.has('Oucodes'))
            headers = this.getOucodeHeaders(
              headers,
              orgState.TenantWithOuCodeTree.OucodeTree,
              orgState.TenantWithOuCodeTree.TenantId === 'Base' ? false : true
            );
        }
      }),
      take(1),
      switchMap((_) => {
        const req = new HttpRequest('DELETE', target + fileKey, {
          headers: headers,
          params: params,
          reportProgress: true,
        });
        return this.httpClient.request<FileDescription>(req);
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        Logger.error('failed at deleting a file.');
        throw error;
      })
    );
  }

  public downloadFile(
    fileKey: string = null,
    fileOutputFormat: string,
    target: string,
    isFileKey: boolean = true,
    zipeFileName: string = ''
  ): Observable<any> {
    let headers = new HttpHeaders();

    target = this.getEndpoint(target);
    let params: HttpParams = new HttpParams();
    if (fileKey && fileKey !== '') params = params.append('fileKey', fileKey);

    params = params.append('fileOutputFormat', fileOutputFormat);
    if (isFileKey !== true)
      params = params.append('isFileKey', isFileKey.toString());
    if (zipeFileName && zipeFileName !== '')
      params = params.append('zipeFileName', zipeFileName);

    return this.userFacade.AuthState$.pipe(
      map((tokenModel: TokenModel) => {
        const token = tokenModel.accessToken;
        if (token) {
          headers = headers.append('Authorization', 'Bearer ' + token);
        }
      }),
      take(1),
      switchMap((_) => {
        return this.orgFacade.OrgState$;
      }),
      map((orgState: OrgState) => {
        if (orgState !== undefined) {
          if (!headers.has('TenantId')) {
            headers = headers.append(
              'TenantId',
              orgState.TenantWithOuCodeTree.TenantId
            );
          }
          if (!headers.has('Oucodes'))
            headers = this.getOucodeHeaders(
              headers,
              orgState.TenantWithOuCodeTree.OucodeTree,
              orgState.TenantWithOuCodeTree.TenantId === 'Base' ? false : true
            );
        }
      }),
      take(1),
      switchMap((_) => {
        const req = new HttpRequest('GET', target, {
          headers: headers,
          params: params,
          responseType: 'blob',
        });
        return this.httpClient.request(req);
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        Logger.error('failed at downloading a file.');

        throw error;
      })
    );
  }

  public downloadFilePost(
    target: string,
    requestBody: any = {}
  ): Observable<any> {
    let headers = new HttpHeaders();
    if (this.encryptionEnabled) {
      requestBody = Cryptography.encryptRequest<any>(
        requestBody,
        this.configService
      );
    }
    target = this.getEndpoint(target);

    const params = new HttpParams();

    return this.userFacade.AuthState$.pipe(
      map((tokenModel: TokenModel) => {
        const token = tokenModel.accessToken;
        if (token) {
          headers = headers.append('Authorization', 'Bearer ' + token);
        }
      }),
      take(1),
      switchMap((_) => {
        return this.orgFacade.OrgState$;
      }),
      map((orgState: OrgState) => {
        if (orgState !== undefined) {
          if (!headers.has('TenantId')) {
            headers = headers.append(
              'TenantId',
              orgState.TenantWithOuCodeTree.TenantId
            );
          }
          if (!headers.has('Oucodes'))
            headers = this.getOucodeHeaders(
              headers,
              orgState.TenantWithOuCodeTree.OucodeTree,
              orgState.TenantWithOuCodeTree.TenantId === 'Base' ? false : true
            );
        }
      }),
      take(1),
      switchMap((_) => {
        return this.httpClient.post(target, requestBody, {
          headers: headers,
          observe: 'body',
          responseType: 'blob',
        });
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        Logger.error('failed at downloading file - post method.');
        throw error;
      })
    );
  }

  getOucodeHeaders(headers, oucodeTree, status): HttpHeaders {
    const ouArr = this.getOucodeList([], oucodeTree, status);
    ouArr.forEach((x) => {
      headers = headers.append('Oucodes', x);
    });
    return headers;
  }

  getOucodeList(oucodeArr, Oucodes, status) {
    if (Array.isArray(Oucodes)) {
      Oucodes.forEach((element, index) => {
        if (status === true) {
          if (element.isSelected === true) oucodeArr.push(element.Oucode);
        } else {
          oucodeArr.push(element.Oucode);
        }

        if (element.hasOwnProperty('Children')) {
          this.getOucodeList(oucodeArr, element.Children, status);
        }
      });
    }
    return oucodeArr;
  }

  protected getBaseUrl(): string {
    return this.file_URL;
  }

  @GET<FileDescription[]>('')
  public getFileDescriptions() {
    return null;
  }

  public downloadAllFilePost(
    requestBody: any = {},
    serviceEndpoint: string
  ): Observable<any> {
    let headers = new HttpHeaders();
    if (this.encryptionEnabled) {
      requestBody = Cryptography.encryptRequest<any>(
        requestBody,
        this.configService
      );
    }
    serviceEndpoint = this.getEndpoint(serviceEndpoint);
    let params: HttpParams = new HttpParams();

    return this.userFacade.AuthState$.pipe(
      map((tokenModel: TokenModel) => {
        const token = tokenModel.accessToken;
        if (token) {
          headers = headers.append('Authorization', 'Bearer ' + token);
        }
      }),
      take(1),
      switchMap((_) => {
        return this.orgFacade.OrgState$;
      }),
      map((orgState: OrgState) => {
        if (orgState !== undefined) {
          if (!headers.has('TenantId')) {
            headers = headers.append(
              'TenantId',
              orgState.TenantWithOuCodeTree.TenantId
            );
          }
          if (!headers.has('Oucodes'))
            headers = this.getOucodeHeaders(
              headers,
              orgState.TenantWithOuCodeTree.OucodeTree,
              orgState.TenantWithOuCodeTree.TenantId === 'Base' ? false : true
            );
        }
      }),
      take(1),
      switchMap((_) => {
        return this.httpClient.post(serviceEndpoint, requestBody, {
          headers: headers,
          observe: 'body',
          responseType: 'blob',
        });
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        Logger.error('failed at downloading all files - post method.');
        throw error;
      })
    );
  }
}
