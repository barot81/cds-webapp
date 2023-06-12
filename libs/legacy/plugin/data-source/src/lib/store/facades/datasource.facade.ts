import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromActions from './../actions/datasource.actions';
import { DataSourceQuery } from '../selectors/datasource.selectors';
import {
  FusionDataSource,
  Pagination,
  Sort,
  Filter,
} from '../../models/Fusion-data-source.model';
import { ColumnOption, CustomHeader } from '../../models/response.model';
import { PatchDataSourceData } from '../../models/patch-datasource-data.model';
import { ResponseMessage } from '../../models/response-message.model';
import { MethodType } from '@zhealthcare/fusion/core';
@Injectable({ providedIn: 'root' })
export class DataSourceFacade {
  fusionDataSet$ = this.store.pipe(select(DataSourceQuery.FusionDataSet));
  fusionDataSource$ = this.store.pipe(select(DataSourceQuery.DataSourceState));
  fusionDataSourceLoading$ = this.store.pipe(
    select(DataSourceQuery.isDataSourceLoading)
  );
  dataSourceTotal$ = this.store.pipe(select(DataSourceQuery.DataSourceTotal));
  dataSourceLoadedDataCount$ = this.store.pipe(
    select(DataSourceQuery.DataSourceLoadedDataCount)
  );
  isAllDataLoaded$ = this.store.pipe(select(DataSourceQuery.IsAllDataLoaded));
  dataSourceDisplayColumns$ = this.store.pipe(
    select(DataSourceQuery.DataSourceDisplayColumns)
  );
  dataSourceFilters$ = this.store.pipe(
    select(DataSourceQuery.DataSourceFilters)
  );
  datasourceSerchFilter$ = this.store.pipe(
    select(DataSourceQuery.DatasourceSerchFilter)
  );

  // filters
  dropDownFilterItems$ = (filedName: string) =>
    this.store.pipe(select(DataSourceQuery.DataSourceFilterItems(filedName)));
  SelectedDataSourceData$ = (id: string) =>
    this.store.pipe(select(DataSourceQuery.SelectedDataSourceData(id)));

  constructor(private readonly store: Store<FusionDataSource>) { }

  LoadDataSource(
    endpoint = '',
    columnOptions: ColumnOption[] = [],
    customHeaders: CustomHeader[] = [],
    applyPagination = true,
    sort: Sort = null,
    requestType: string = MethodType.GET,
    filters?: Filter[],
    pagination?:Pagination
  ) {
    // localStorage.removeItem('fusionDataSource'); : kp
    let fusionDataSource: FusionDataSource = JSON.parse(
      localStorage.getItem('fusionDataSource')
    );
    if (endpoint === '') {
      endpoint = fusionDataSource.endPoint;
      columnOptions = fusionDataSource.displayColumns;
    } else {
      if (fusionDataSource === (undefined || null)) {
        fusionDataSource = new FusionDataSource();
      }
      fusionDataSource.endPoint = endpoint;
      fusionDataSource.displayColumns = columnOptions.filter(
        (x) => x.isDisplayColumn
      );
      fusionDataSource.remainingDisplayColumns = columnOptions.filter(
        (x) => x.isRemainingDisplayColumn
      );

      if (sort !== null) {
        fusionDataSource.sort = { ...fusionDataSource.sort, ...sort };
      }
      if (pagination !== null) {
        fusionDataSource.pagination = { ...fusionDataSource.pagination, ...pagination };
      }
      fusionDataSource.filters = [];
      fusionDataSource.requestType = requestType;
      if(customHeaders && customHeaders.length > 0){
        fusionDataSource.customHeaders = customHeaders;
      }
      if(filters && filters.length > 0){
        fusionDataSource.filters = filters;
      }
      localStorage.setItem(
        'fusionDataSource',
        JSON.stringify(fusionDataSource)
      );
    }
    this.store.dispatch(
      fromActions.LoadDataSource({
        endPoint: endpoint,
        columnOptions: columnOptions,
        customHeaders: customHeaders,
        applyPagination: applyPagination,
        sort: fusionDataSource.sort,
        requestType: requestType,
        filters:fusionDataSource.filters,
        pagination:fusionDataSource.pagination
      })
    );
  }
  // Ankit : For future Use
  getFilterPayload(existingFilter, newPayload) {
    let existingFilterFlag = true;
    newPayload.forEach((val) => {
      const compareFilter = existingFilter.filter(
        (x) =>
          x.fieldName === val.fieldName &&
          x.operator === val.operator &&
          x.value === val.value
      );
      if (compareFilter.length === 0) {
        existingFilterFlag = false;
      }
    });

    if (existingFilterFlag) {
      return existingFilter;
    } else {
      return newPayload;
    }
  }
  InitializeDataSource(payload: FusionDataSource) {

    //localStorage.removeItem('fusionDataSource'); [ By Ankit]
    let fusionDataSource: FusionDataSource = JSON.parse(localStorage.getItem('fusionDataSource'));
    if (fusionDataSource === (undefined || null)) {
      fusionDataSource = new FusionDataSource();
    }
    fusionDataSource.endPoint =
      payload.endPoint === '' ? fusionDataSource.endPoint : payload.endPoint;
    fusionDataSource.displayColumns =
      payload.displayColumns === (undefined || null) ||
        payload.displayColumns?.length === 0
        ? fusionDataSource.displayColumns
        : payload.displayColumns;
    fusionDataSource.remainingDisplayColumns =
      payload.remainingDisplayColumns === (undefined || null) ||
        payload.remainingDisplayColumns?.length === 0
        ? fusionDataSource.remainingDisplayColumns
        : payload.remainingDisplayColumns;
    fusionDataSource.sort =
      payload.sort === (undefined || null)
        ? fusionDataSource.sort
        : payload.sort;
    fusionDataSource.requestType =
      payload.requestType === ''
        ? fusionDataSource.requestType
        : payload.requestType;
    fusionDataSource.pagination =
      payload.pagination === (undefined || null)
        ? fusionDataSource.pagination
        : payload.pagination;
    fusionDataSource.filterQueryparmByFieldName = payload.filterQueryparmByFieldName;
    fusionDataSource.overRideDefaultHeader = payload.overRideDefaultHeader;
    fusionDataSource.multiColumnSearch = payload.multiColumnSearch ? payload.multiColumnSearch : fusionDataSource.multiColumnSearch;
    if (payload.requestType === 'GET')
      fusionDataSource.filters =
        payload.filters === (undefined || null)
          ? fusionDataSource.filters
          : payload.filters;
    else
      fusionDataSource.filters =
        payload.filters === (undefined || null) || payload.filters?.length === 0
          ? fusionDataSource.filters
          : payload.filters;
    fusionDataSource.customHeaders = payload.customHeaders;
    localStorage.setItem('fusionDataSource', JSON.stringify(fusionDataSource));

    this.store.dispatch(
      fromActions.InitializeDataSource({
        payload: fusionDataSource,
      })
    );
  }

  sortDataSource(columnName: string, direction = 'asc') {
    const sort: Sort = {
      columnName: columnName,
      direction: direction,
    };
    this.store.dispatch(fromActions.SortDataSource({ payload: sort }));
  }

  updateDataSourceFilter(payload: Filter) {

    this.store.dispatch(fromActions.UpdateFilter({ payload }));
    const fusionDataSource: FusionDataSource = JSON.parse(
      localStorage.getItem('fusionDataSource')
    );
    let filters: Filter[] = [];
    if (fusionDataSource.filters !== undefined)
      filters = [...fusionDataSource.filters];
    filters = filters.filter((x) => x.fieldName !== payload.fieldName);
    filters.push(payload);
    fusionDataSource.filters = filters;
    localStorage.setItem('fusionDataSource', JSON.stringify(fusionDataSource));
  }

  updateAllDataSourceFilter(filters: Filter[], startIndex = 0, pageSize = 30) {
    //this.store.dispatch(fromActions.UpdateFilter({payload}));
    const fusionDataSource: FusionDataSource = JSON.parse(
      localStorage.getItem('fusionDataSource')
    );
    if (fusionDataSource.filters) {
      const searchFilter = fusionDataSource.filters.filter(
        (x) => x && x.type === 'search'
      );
      searchFilter.forEach((x) => {
        if (x  && x.value !== '') filters.push(x);
      });
    }
    fusionDataSource.filters = filters;

    if (
      fusionDataSource.pagination
    ) {
      fusionDataSource.pagination.startIndex = startIndex;
      fusionDataSource.pagination.pageSize = pageSize;
      // fusionDataSource.pagination.pageSize;
    } else {
      const pagination: Pagination = {
        startIndex: startIndex,
        pageSize: pageSize,
      };
      fusionDataSource.pagination = { ...fusionDataSource.pagination, ...pagination };
    }
    localStorage.setItem('fusionDataSource', JSON.stringify(fusionDataSource));
    this.store.dispatch(fromActions.UpdateAllFilters({ payload: filters, startIndex: startIndex}));
  }

  updateSerchFilter(exisitingFieldName: string, filter: Filter, pageSize = 30) {
    this.store.dispatch(
      fromActions.UpdateSearchFilter({
        payload: { exisitingFieldName, filter },
      })
    );

    const fusionDataSource: FusionDataSource = JSON.parse(
      localStorage.getItem('fusionDataSource')
    );
    let filters = [];
    if (
      fusionDataSource?.filters
    )
      filters = [
        ...fusionDataSource.filters.filter((x) => x.type !== 'search'),
      ];
    filters.push(filter);

    if (
      fusionDataSource?.pagination
    ) {
      fusionDataSource.pagination.startIndex = 0;
      fusionDataSource.pagination.pageSize = pageSize;
    } else {
      const pagination: Pagination = {
        startIndex: 0,
        pageSize: pageSize,
      };
      if (fusionDataSource && fusionDataSource !== null) {
        fusionDataSource['pagination'] = pagination;
      }
    }
    if (fusionDataSource && fusionDataSource !== null) {
      fusionDataSource['filters'] = filters;
    }
    localStorage.setItem('fusionDataSource', JSON.stringify(fusionDataSource));
  }

  GetDataSource(
    columnName?: string,
    direction = 'asc',
    startIndex = 0,
    pageSize = 30
  ) {
    const pagination: Pagination = {
      pageSize: pageSize,
      startIndex: startIndex,
    };
    const fusionDataSource: FusionDataSource = JSON.parse(
      localStorage.getItem('fusionDataSource')
    );
    if(columnName){
      fusionDataSource.sort.columnName = columnName;
      fusionDataSource.sort.direction = direction;
    }
    fusionDataSource.pagination = { ...fusionDataSource.pagination, ...pagination };
    localStorage.setItem('fusionDataSource', JSON.stringify(fusionDataSource));

    this.store.dispatch(
      fromActions.DataSourceUpdate({
        payload: {
          sort: fusionDataSource.sort,
          pagination: fusionDataSource.pagination,
          loading: true,
          filters: [],
          data: null,
          total: 0,
          selectedItem: null,
          endPoint: null,
          displayColumns: [],
          remainingDisplayColumns: [],
          requestType: null,
          multiColumnSearch: null,
          customHeaders:fusionDataSource.customHeaders
        },
      })
    );
  }

  DataSourceDestroy() {
    this.store.dispatch(fromActions.DataSourceDestroy());
  }

  LoadNextBatchOfData() {
    this.store.dispatch(fromActions.LoadNextBatchOfData());
  }

  DisplayColumnUpdate(
    displayColumns: ColumnOption[],
    remainingDisplayColumns: ColumnOption[]
  ) {
    this.store.dispatch(
      fromActions.DisplayColumnUpdate({
        payload: { displayColumns, remainingDisplayColumns },
      })
    );

    const fusionDataSource: FusionDataSource = JSON.parse(
      localStorage.getItem('fusionDataSource')
    );
    fusionDataSource.displayColumns = { ...displayColumns };
    fusionDataSource.remainingDisplayColumns = { ...remainingDisplayColumns };
    localStorage.setItem('fusionDataSource', JSON.stringify(fusionDataSource));
  }

  DataSourceDataUpdated(
    updateEndpoint: string,
    payload: any,
    customHeaders: CustomHeader[] = [],
    responseMessage?: ResponseMessage
  ) {
    this.store.dispatch(
      fromActions.DataSourceDataUpdated({
        updateEndpoint: updateEndpoint,
        payload: payload,
        customHeaders: customHeaders,
        responseMessage: responseMessage,
      })
    );
  }
  DataSourceDataAdded(
    postEndpoint: string,
    payload: any,
    customHeaders: CustomHeader[] = [],
    responseMessage?: ResponseMessage
  ) {
    this.store.dispatch(
      fromActions.DataSourceDataAdded({
        postEndpoint: postEndpoint,
        payload: payload,
        customHeaders: customHeaders,
        responseMessage: responseMessage,
      })
    );
  }

  DataSouceDataPatch(
    datasourceDataPatch: PatchDataSourceData | PatchDataSourceData[]
  ) {
    this.store.dispatch(
      fromActions.PatchDataSouceData({ payload: datasourceDataPatch })
    );
  }
  DataSourceDataReplace(replacedData) {
    this.store.dispatch(
      fromActions.ReplaceDataSource({ payload: replacedData })
    );
  }

  DataSourceDataDeleteSuccess(recordId: string) {
    this.store.dispatch(fromActions.DataSourceDataDeleteSuccess({ recordId }));
  }
}
