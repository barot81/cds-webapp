import { Action, createReducer, on } from '@ngrx/store';
import {
  Filter, FusionDataSource, Pagination
} from '../../models/Fusion-data-source.model';
import { PatchDataSourceData } from '../../models/patch-datasource-data.model';
import * as DataSourceActions from '../actions/datasource.actions';

const fusionDataSource: FusionDataSource = JSON.parse(
  localStorage.getItem('fusionDataSource')
);
const storageExist = fusionDataSource === (undefined || null) ? false : true;
const initialFusionDataSource: FusionDataSource = {
  filters:
    storageExist && fusionDataSource.filters !== undefined
      ? fusionDataSource.filters
      : [],
  sort: storageExist ? fusionDataSource.sort : null,
  pagination: {
    pageSize: 30,
    startIndex: 0
  },
  displayColumns: storageExist ? fusionDataSource.displayColumns : [],
  remainingDisplayColumns: storageExist
    ? fusionDataSource.remainingDisplayColumns
    : [],
  total: 0,
  data: null,
  endPoint: storageExist ? fusionDataSource.endPoint : null,
  loading: false,
  selectedItem: null,
  requestType: null,
  multiColumnSearch: null
};


const dataSourceReducer = createReducer(
  initialFusionDataSource,
  on(
    DataSourceActions.LoadDataSource,
    (state: FusionDataSource, { endPoint, columnOptions, sort, requestType }) => {
      const pagination = { ...state.pagination };
      pagination.startIndex = pagination.startIndex || 0;
      return {
        ...state,
        loading: true,
        endPoint: endPoint,
        displayColumns: columnOptions.filter(x => x.isDisplayColumn),
        remainingDisplayColumns: columnOptions.filter(x => x.isRemainingDisplayColumn),
        pagination: pagination,
        sort: sort,
        requestType: requestType
      };
    }
  ),
  on(
    DataSourceActions.InitializeDataSource,
    (state: FusionDataSource, { payload }) => {
      return (state = { ...payload, loading: true });
    }
  ),

  on(
    DataSourceActions.DataSourceLoaded,
    (state: FusionDataSource, { payload }) => {
      return (state = {
        ...state,
        loading: false,
        data: payload.data,
        total: payload?.total
      });
    }
  ),
  on(
    DataSourceActions.SortDataSource,
    (state: FusionDataSource, { payload }) => {
      return (state = { ...state, sort: payload, loading: true });
    }
  ),
  on(
    DataSourceActions.DataSourceSorted,
    (state: FusionDataSource, { payload }) => {
      return (state = {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      });
    }
  ),
  on(
    DataSourceActions.DataSourceUpdate,
    (state: FusionDataSource, { payload }) => {
      return (state = {
        ...state,
        sort: payload.sort,
        pagination: payload.pagination,
        loading: true
      });
    }
  ),
  on(
    DataSourceActions.DataSourceUpdated,
    (state: FusionDataSource, { payload }) => {
      let latestData = state.data;
      latestData = latestData.concat(payload.data);
      return (state = {
        ...state,
        data: latestData,
        total: payload.total,
        loading: false
      });
    }
  ),
  on(DataSourceActions.UpdateFilter, (state: FusionDataSource, { payload, startIndex = 0 }) => {

    const existingFilters: Filter[] = [...state.filters];
    const existingFilterIndex = existingFilters.findIndex(
      x => x.fieldName === payload.fieldName
    );
    if (existingFilterIndex > -1)
      existingFilters.splice(existingFilterIndex, 1);
    existingFilters.push(payload);
    const pagination = { ...state.pagination };
    pagination.startIndex = startIndex;
    return (state = { ...state, filters: existingFilters, pagination: pagination, loading: true });
  }),
  on(DataSourceActions.UpdateAllFilters, (state: FusionDataSource, { payload,startIndex=0 }) => {
    const pagination = { ...state.pagination };
    pagination.startIndex = startIndex;
    return (state = { ...state, filters: payload, pagination: pagination, loading: true });
  }),
  on(
    DataSourceActions.UpdateFilterSuccess,
    (state: FusionDataSource, { payload }) => {
      return (state = {
        ...state,
        data: payload.data,
        total: payload.total,
        loading: false
      });
    }
  ),
  on(
    DataSourceActions.UpdateSearchFilter,
    (state: FusionDataSource, { payload }) => {
      const existingFilters: Filter[] = [
        ...state.filters.filter(x => x.type !== 'search')
      ];
      const pagination = { ...state.pagination };
       pagination.startIndex = 0;
      // if (payload.filter != undefined) existingFilters.push(payload.filter);
      // return (state = { ...state, filters: existingFilters, pagination:pagination, loading: true });
      if (payload.filter != undefined) existingFilters.push(payload.filter);
      return (state = { ...state, filters: existingFilters, pagination: pagination, loading: true });

    }
  ),
  on(DataSourceActions.LoadNextBatchOfData, (state: FusionDataSource, { }) => {
    const pagination: Pagination = {
      ...state.pagination,
      startIndex: state.pagination?.startIndex + state.pagination.pageSize
    };
    return (state = { ...state, pagination: pagination, loading: true });
  }),
  on(
    DataSourceActions.NextBatchOfDataSuccess,
    (state: FusionDataSource, { payload }) => {
      let newData: any;
      newData =
        state.data == null
          ? payload.data
          : [...state.data].concat(payload.data);
      return (state = {
        ...state,
        data: newData,
        loading: false,
        total: payload.total
      });
    }
  ),
  on(
    DataSourceActions.DisplayColumnUpdate,
    (state: FusionDataSource, { payload }) => {
      return (state = {
        ...state,
        displayColumns: payload.displayColumns,
        remainingDisplayColumns: payload.remainingDisplayColumns
      });
    }
  ),
  on(DataSourceActions.DataSourceDestroy, (state: FusionDataSource, { }) => {
    return (state = {
      filters: [],
      sort: null,
      pagination: {
        pageSize: 30,
        startIndex: 0
      },
      displayColumns: [],
      remainingDisplayColumns: [],
      total: 0,
      data: null,
      endPoint: null,
      loading: false,
      selectedItem: null,
      requestType: null,
      multiColumnSearch: []
    });
  }),
  on(
    DataSourceActions.DataSourceDataAddedSuccess,
    (state: FusionDataSource, { payload }) => {
      const payloadData = Array.isArray(payload.data) ? payload.data : [payload.data];
      const newData =
        state.data == null ? payloadData : payloadData.concat(...state.data);
      return (state = {
        ...state,
        data: newData,
        loading: false,
        total: state.total + payload.addedCount
      });
    }
  ),
  on(
    DataSourceActions.DataSourceDataUpdatedSuccess,
    (state: FusionDataSource, { payload }) => {
      const updatedDataIndex: any = state.data.findIndex(
        x => x.id == payload.data.id
      );
      if (updatedDataIndex !== -1) {
        const newData = [...state.data];
        newData.splice(updatedDataIndex, 1, payload.data);

        return (state = {
          ...state,
          data: newData,
          loading: false,
          total: state.total - 1
        });
      }
    }
  ),
  on(
    DataSourceActions.PatchDataSouceData,
    (state: FusionDataSource, { payload }) => {
      let newData;
      if (Array.isArray(payload)) {
        newData = [...state.data];
        payload.forEach(x => {
          newData = ApplyPatch(newData, x);
        });
      } else {
        newData = ApplyPatch(state.data, payload);
      }

      return (state = { ...state, data: newData });
    }
  ),
  on(
    DataSourceActions.ReplaceDataSource,
    (state: FusionDataSource, { payload }) => {
      return (state = { ...state, data: payload });
    }
  ),
  on(
    DataSourceActions.DataSourceDataDeleteSuccess,
    (state: FusionDataSource, { recordId }) => {
      const datasourceData = [...state.data];
      const recordIndex = datasourceData.findIndex(x => x.id === recordId);
      datasourceData.splice(recordIndex, 1);
      return (state = { ...state, data: datasourceData });
    }
  ),
  on(
    DataSourceActions.DataSourceLoadError,
    (state: FusionDataSource, { payload }) => {
      return (state = {
        ...state,
        data: payload,
        loading: false
      });
    }
  )
);

export function DataSourceReducer(
  state: FusionDataSource | undefined,
  action: Action
) {
  return dataSourceReducer(state, action);
}

function ApplyPatch(stateData: any, payload: PatchDataSourceData): any {
  const updatedDataIndex: any = stateData.findIndex(x => x.id == payload.id);
  if (updatedDataIndex !== -1) {
    const exisitingDataEntry = stateData[updatedDataIndex];
    const updatedDataEntry = { ...exisitingDataEntry };
    const keys = Object.keys(payload.changes);
    keys.forEach(key => {
      updatedDataEntry[key] = payload.changes[key];
      // updatedData = { ...updatedData, key.value: payload.changes[key]};
    });

    const newData = [...stateData];
    newData.splice(updatedDataIndex, 1, updatedDataEntry);
    return newData;
  }
}
