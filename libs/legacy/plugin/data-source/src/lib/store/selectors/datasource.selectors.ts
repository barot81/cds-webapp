import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FusionDataSource } from '../../models/Fusion-data-source.model';

export const DataSourceAppState = createFeatureSelector<FusionDataSource>(
  'data-source'
);

export const DataSourceState = createSelector(
  DataSourceAppState,
  (state: FusionDataSource) => state
);

export const isDataSourceLoading = createSelector(
  DataSourceState,
  (state: FusionDataSource) => state.loading
);

export const DataSourceFilters = createSelector(
  DataSourceState,
  (state: FusionDataSource) => state.filters
);

export const FusionDataSet = createSelector(
  DataSourceState,
  (state: FusionDataSource) => state.data
  );

export const DataSourceEndPoint = createSelector(
  DataSourceState,
  (state: FusionDataSource) => state.endPoint
);

export const DataSourceTotal = createSelector(
  DataSourceState,
  (state: FusionDataSource) =>
    state.total == undefined ? 0: state.total
);

export const DataSourceLoadedDataCount = createSelector(
  DataSourceState,
  (state: FusionDataSource) =>
    state.data === undefined || state.data === null ? 0: state.data.length
);

export const IsAllDataLoaded = createSelector(
  DataSourceState,
  (state:FusionDataSource) =>
     state.data?.length >= state.total ? true : state.loading
);

export const
DataSourceFilterItems = (fieldName:string) => createSelector(
  DataSourceState,
  (state: FusionDataSource) => fieldName == undefined ? [] : state.filters.find(x=>x.fieldName == fieldName)?.items
);

export const
DataSourceDisplayColumns = createSelector(
  DataSourceState,
  (state:FusionDataSource) => {
    return { 
      displayColumns : state.displayColumns,
      remainingDisplayColumns:state.remainingDisplayColumns 
    }
  }
)

export const DatasourceSerchFilter = createSelector(
  DataSourceState,
  (state:FusionDataSource) => state.filters.find(x=>x.type == 'search')
)


export const
SelectedDataSourceData = (id:string) => createSelector(
  DataSourceState,
  (state: FusionDataSource) => id == undefined ? [] : state.data.find(x=>x.id == id)
);


export const DataSourceQuery = {
  DataSourceState,
  FusionDataSet,
  isDataSourceLoading,
  DataSourceEndPoint,
  DataSourceTotal,
  IsAllDataLoaded,
  DataSourceDisplayColumns,
  DatasourceSerchFilter,
  DataSourceFilterItems,
  SelectedDataSourceData,
  DataSourceFilters,
  DataSourceLoadedDataCount
};
