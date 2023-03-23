import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Cryptography, FusionConfigService, HttpConstants,
  MethodType, OrgFacade, OrgState, OucodeHelper, RequestHeader, UserFacade
} from '@zhealthcare/fusion/core';
import { TokenModel } from '@zhealthcare/fusion/models';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import {
  Filter, FusionDataSource, PayloadFilter, RequestPayload
} from '../models/Fusion-data-source.model';
import { ColumnOption, CustomHeader } from '../models/response.model';
import { DataSourceFacade } from '../store/facades/datasource.facade';

@Injectable({ providedIn: 'root' })
export class DataSourceService {
  customHeaders: any;
  constructor(
    private readonly dataSourceFacade: DataSourceFacade,
    private readonly userFacade: UserFacade,
    private readonly orgFacade: OrgFacade,
    private readonly httpClient: HttpClient,
    private readonly configService: FusionConfigService
  ) { }

  getEndpoint(
    endpoint: string = null,
    applyPagination = true
  ): Observable<string> {
    endpoint = endpoint ? this.getRequestEndpoint(endpoint) : null;
    if (this.getRequestType() === MethodType.GET) {
      if (endpoint != undefined && endpoint.indexOf('?') <= -1) endpoint += '?';

      return this.dataSourceFacade.fusionDataSource$.pipe(
        map((dataSource: FusionDataSource) => {
          if (endpoint === undefined && dataSource.endPoint === undefined)
            return '';
          endpoint = endpoint || dataSource.endPoint;
          if (
            dataSource.sort !== null &&
            dataSource.sort !== undefined &&
            !endpoint.includes('SortBy') &&
            !!dataSource.sort.columnName
          ) {
            if (dataSource.sort.customFieldParm) {
              endpoint +=
                (endpoint[endpoint.length - 1] === ('?' || '&') ? '' : '&') + this.getCustomSortData(dataSource);
            } else {
              endpoint +=
                (endpoint[endpoint.length - 1] === ('?' || '&') ? '' : '&') +
                `$SortBy=${dataSource.sort.columnName} ${dataSource.sort.direction}`;
            }
          }
          if (
            dataSource.pagination != null && dataSource.pagination != undefined &&
            !endpoint.includes('PageSize') &&
            applyPagination
          ) {
            if (dataSource.pagination.customFieldParm) {
              if (!endpoint.includes('?')) {
                endpoint += '?';
              }
              endpoint +=
                (endpoint[endpoint.length - 1] === ('?' || '&') ? '' : '&') +
                this.getCustomPagination(dataSource);
            } else {
              endpoint +=
                (endpoint[endpoint.length - 1] === ('?' || '&') ? '' : '&') +
                `$PageSize=${dataSource.pagination.pageSize}&$Start=${dataSource.pagination?.startIndex}`;
            }

          }

          if (dataSource.filters.length > 0) {
            if (dataSource.filterQueryparmByFieldName) {
              if (!endpoint.includes('?')) {
                endpoint += '?';
              } else {
                endpoint += '&';
              }
              endpoint += this.getCustomFilterData(dataSource);
            } else {
              let subEndpoint = '';
              dataSource.filters.forEach((filter) => {
                const currentFilter = this.getFilter(filter);
                subEndpoint +=
                  dataSource?.filterQueryparmByFieldName ? `${currentFilter}&` : (currentFilter?.length > 2 ? `and ${currentFilter}` : '');
              });
              if (subEndpoint.length > 2)
              endpoint +=
              (endpoint[endpoint.length - 1] === ('?' || '&') ? '' : '&') +
              `$Filters=(${subEndpoint.substr(4)})`;
            }
          }

          return endpoint;
        }),
        take(1)
      );
    } else {
      return this.getCustomEndpoint(endpoint);
    }
  }
  getCustomEndpoint(endpoint: string = null): Observable<string> {
    return this.dataSourceFacade.fusionDataSource$.pipe(
      map((dataSource: FusionDataSource) => {
        if (endpoint === undefined && dataSource.endPoint === undefined)
          return '';
        endpoint = endpoint || dataSource.endPoint;
        return endpoint;
      }),
      take(1)
    );
  }
  getFilter(filter: Filter): string {
    switch (filter.operator) {
      case 'contains':
        if (Array.isArray(filter.value)) {
          if (filter.value.length == 1)
            return `${filter.fieldName} eq '${filter.value[0]}'`;
        } else if (
          filter.fieldName !== (undefined || null || '') &&
          filter.value !== (undefined || null || '')
        ) {
          const filterValue = filter.value
            .replace('&', '&&')
            .replace("'", "\\'");
          if (filter.type === 'search') {
            return `${filter.fieldName} contains '${filterValue}'`;
          } else {
            return `${filter.fieldName} eq '${filterValue}'`;
          }
        }
        break;
      case 'eq':
        const filterValue = filter.value.replace('&', '&&').replace("'", "\\'");
        return `${filter.fieldName} eq '${filterValue}'`;
      case 'gt':
        break;
      case 'startsWith':
        break;
      case 'endsWith':
        break;
    }
    return null;
  }

  getColumns(columnOptions: ColumnOption[]): string {
    return '$Columns=' + columnOptions.map((x) => x.fieldName).join(',');
  }

  getDataSource<T>(
    endPoint: string,
    customHeaders: CustomHeader[] = [],
    requestType: string = MethodType.GET,
    applyPagination = true
  ): Observable<T> {
    // Request Interceptor
    endPoint = this.getRequestEndpoint(endPoint);
    let headers: HttpHeaders = new HttpHeaders();
    const observable = this.userFacade.AuthState$.pipe(
      map((tokenModel: TokenModel) => {
        headers = RequestHeader.setTokenHeader(tokenModel, headers);
      }),
      take(1),
      switchMap((_) => {
        return this.orgFacade.OrgState$;
      }),
      map((orgState: OrgState) => {
        headers = this.setHeaders(headers, customHeaders, orgState);
      }),
      take(1),
      switchMap((_) => {
        let body: any;
        //combine into one
        body = this.getRequestPayload(applyPagination);
        let requestBody: any = body;
        if (
          this.configService.appSettings.Cryptography.EnableEncryption &&
          requestType === MethodType.POST
        ) {
          requestBody = Cryptography.encryptRequest<T>(
            body,
            this.configService
          );
        }
        return this.httpClient.request<T>(requestType, endPoint, {
          headers: headers,
          observe: 'response',
          responseType: 'json',
          body: requestType === MethodType.POST ? requestBody : undefined,
        });
      })
    );

    const response: Observable<T> = observable.pipe(map((res) => res.body));
    return response;
  }

  setHeaders(
    headers: HttpHeaders,
    customHeaders: CustomHeader[],
    orgState: OrgState
  ): HttpHeaders {
    headers = RequestHeader.setDefaultHeaders(headers);
    let oucodesArray: string[] = [];
    if (orgState !== undefined) {
      oucodesArray = OucodeHelper.getOucodeList(
        oucodesArray,
        orgState.TenantWithOuCodeTree.OucodeTree,
        orgState.TenantWithOuCodeTree.TenantId === HttpConstants.BASE
          ? false
          : true
      );
      headers = RequestHeader.setTenantAndOucodeHeader(
        headers,
        orgState,
        oucodesArray
      );
    }

    if (customHeaders.length > 0) {
      customHeaders.forEach((x) => {
        headers = headers.append(x.name, x.value);
      });
    }
    if (this.customHeaders && this.customHeaders.length > 0) {
      this.customHeaders.forEach((x) => {
        headers = headers.append(x.name, x.value);
      });
    }
    return headers;
  }

  getDataSourceData<T>(
    method: string,
    endpoint: string,
    body: any,
    customHeaders: CustomHeader[] = []
  ) {
    let headers: HttpHeaders = new HttpHeaders();
    endpoint = this.getRequestEndpoint(endpoint);
    const observable = this.userFacade.AuthState$.pipe(
      map((tokenModel: TokenModel) => {
        headers = RequestHeader.setTokenHeader(tokenModel, headers);
      }),
      take(1),
      switchMap((_) => {
        return this.orgFacade.OrgState$;
      }),
      map((orgState: OrgState) => {
        headers = this.setHeaders(headers, customHeaders, orgState);
      }),
      take(1),
      switchMap((_) => {
        let requestBody: any = body;
        if (this.configService.appSettings.Cryptography.EnableEncryption) {
          requestBody = Cryptography.encryptRequest<T>(
            body,
            this.configService
          );
        }
        return this.httpClient.request<T>(method, endpoint, {
          body: requestBody,
          headers: headers,
          observe: 'response',
          responseType: 'json',
        });
      })
    );
    const response: Observable<T> = observable.pipe(map((res) => res.body));
    return response;
  }

  getRequestPayload(applyPagination = true) {
    const requestPayload = new RequestPayload();
    this.dataSourceFacade.fusionDataSource$
      .subscribe((dataSource) => {
        if (
          dataSource.pagination &&
          dataSource.pagination.pageSize &&
          applyPagination
        ) {

          if (dataSource.pagination) {
            if (dataSource.pagination.customFieldParm) {
              requestPayload[dataSource.pagination.customFieldParm.pageSizeFieldName] = dataSource.pagination.pageSize;
              requestPayload[dataSource.pagination.customFieldParm.startIndexFieldName] = dataSource.pagination?.startIndex;
            } else {
              requestPayload.pageSize = dataSource.pagination.pageSize;
              requestPayload.start = dataSource.pagination?.startIndex;
            }
          }

        }
        if (dataSource.multiColumnSearch) {
          requestPayload.multiColumnSearch = dataSource.multiColumnSearch;
        }
        if (dataSource.filters && dataSource.filters.length > 0) {

          const filters = dataSource.filters.filter(
            (x) => x.fieldName !== '' && x.value !== ''
          );
          filters.forEach((x) => {
            if (x !== undefined && x.fieldName !== undefined) {
              let condition: string;
              if (x.type === 'search') {
                condition = 'Contains';
              } else {
                condition = 'Equals';
              }

              const newFilter = new PayloadFilter(
                x.fieldName,
                x.value,
                condition
              );
              //Due to zhealthcare SQE parsing wont happen in the POST request
              requestPayload.filters.push(newFilter);
            }
          });

        }
        if (dataSource.sort) {
          requestPayload.sortBy = `${dataSource.sort.columnName}.${dataSource.sort.direction}`;
        }
      })
      .unsubscribe();
    return requestPayload;
  }
  getRequestType() {
    let requestType: string;
    this.dataSourceFacade.fusionDataSource$
      .subscribe((x) => {
        if (
          x !== undefined &&
          x !== null &&
          x.requestType !== undefined &&
          x.requestType !== null
        ) {
          requestType = x.requestType;
        } else {
          requestType = MethodType.GET;
        }
      })
      .unsubscribe();
    return requestType;
  }

  getCustomSortData(dataSource: FusionDataSource) {
    return `${dataSource.sort.customFieldParm.sortByFieldName}=${dataSource.sort.columnName}&${dataSource.sort.customFieldParm.sortDirectionFieldName}=${dataSource.sort.direction}`;
  }

  getCustomPagination(dataSource: FusionDataSource) {
    return `${dataSource.pagination.customFieldParm.pageSizeFieldName}=${dataSource.pagination.pageSize}&${dataSource.pagination.customFieldParm.startIndexFieldName}=${dataSource.pagination?.startIndex}`;

  }

  getCustomHeaders() {
    return this.customHeaders;
  }
  setcustomHeaders(headers: any[]) {
    this.customHeaders = headers;
  }

  getCustomFilterData(dataSource: FusionDataSource) {
    const filterArray = [];
    dataSource.filters.forEach(item => {
      filterArray.push(item.fieldName + "=" + item.value);
    });
    return filterArray.join("&");
  }

  protected geGatewayUrl(): string {
    return this.configService.appSettings.gateway.endpoint;
  }

  protected getRequestEndpoint(targetUrl: string) {
    targetUrl =
      targetUrl.startsWith('http://') || targetUrl.startsWith('https://')
        ? targetUrl
        : this.geGatewayUrl() != ''
          ? this.geGatewayUrl() + targetUrl
          : targetUrl;
    return targetUrl;
  }
}
