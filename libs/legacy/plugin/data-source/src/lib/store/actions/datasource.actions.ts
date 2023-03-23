import { createAction, props } from '@ngrx/store';
import { PatchDataSourceData } from '../../models/patch-datasource-data.model';
import { ResponseMessage } from '../../models/response-message.model';
import { ColumnOption, CustomHeader } from '../../models/response.model';
import {
  Filter, FusionDataSource, Pagination,
  Sort
} from './../../models/Fusion-data-source.model';

export const LoadDataSource = createAction(
  '[Load DataSource] Load DataSource',
  props<{
    endPoint: string;
    columnOptions: ColumnOption[];
    customHeaders: CustomHeader[];
    applyPagination: boolean;
    sort: Sort;
    requestType: string;
  }>()
);

export const InitializeDataSource = createAction(
  '[DataSource Initialized] DataSource Initialized',
  props<{ payload: any }>()
);
export const DataSourceLoaded = createAction(
  '[DataSource Loaded] DataSource Loaded',
  props<{ payload: any }>()
);

export const DataSourceUpdate = createAction(
  '[DataSource Update] DataSource Update',
  props<{ payload: FusionDataSource }>()
);

export const DataSourceUpdated = createAction(
  '[DataSource Updated] DataSource Updated',
  props<{ payload: any }>()
);

export const DataSourceDeleted = createAction(
  '[DataSource Deleted] DataSource Deleted',
  props<{ payload: any }>()
);

export const DisplayColumnUpdate = createAction(
  '[DisplayColumn Update] DisplayColumn Updated',
  props<{
    payload: {
      displayColumns: ColumnOption[];
      remainingDisplayColumns: ColumnOption[];
    };
  }>()
);

export const UpdateFilter = createAction(
  '[Update DataSource Filter] Update DataSource Filter',
  props<{ payload: Filter, startIndex?:number }>()
);

// export const UpdateMultipleFilters = createAction(
//   '[Update DataSource Multiple Filters] Update DataSource Multiple Filters',
//   props<{ payload: Filter[] }>()
// );

export const UpdateAllFilters = createAction(
  '[Update All DataSource Filter] Update all DataSource Filter',
  props<{ payload: Filter[],startIndex?:number }>()
);

export const UpdateFilterSuccess = createAction(
  '[Update DataSource Filter Success] DataSource Filter update',
  props<{ payload: any }>()
);

export const UpdateSearchFilter = createAction(
  '[Update DataSource Search Filter] Update DataSource Search Filter',
  props<{ payload: { exisitingFieldName: string; filter: Filter } }>()
);

export const UpdateSort = createAction(
  '[Update DataSource] Update DataSource Sort',
  props<{ id: number; payload: Sort }>()
);

export const SortDataSource = createAction(
  '[Sort DataSource] Sort DataSource',
  props<{ payload: Sort }>()
);
export const DataSourceSorted = createAction(
  '[DataSource Sorted] DataSource Sorted',
  props<{ payload: any }>()
);

export const UpdatePagination = createAction(
  '[Update DataSource Filter] Update DataSource Pagination',
  props<{ id: number; payload: Pagination }>()
);

export const DataSourceLoadError = createAction(
  '[DataSource Load Error] DataSource Load Error',
  props<{ payload: any }>()
);

export const DataSourceDestroy = createAction(
  '[Destroy DataSource] Destroy DataSource'
);

export const LoadNextBatchOfData = createAction(
  '[Load Next Batch of DataSource data] Update DataSource Data'
);
export const NextBatchOfDataSuccess = createAction(
  '[next batch of DataSource Loaded] next batch of DataSource Loaded',
  props<{ payload: any }>()
);

export const DataSourceDataAdded = createAction(
  '[DataSource Data Add] DataSource Data add',
  props<{
    postEndpoint: string;
    payload: any;
    customHeaders: CustomHeader[];
    responseMessage: ResponseMessage;
  }>()
);

export const DataSourceDataAddedSuccess = createAction(
  '[DataSource Data Add Success] DataSource Data added Successfully',
  props<{ payload: any }>()
);

export const DataSourceDataUpdated = createAction(
  '[DataSource Data Update] DataSource Data Update',
  props<{
    updateEndpoint: string;
    payload: any;
    customHeaders: CustomHeader[];
    responseMessage: ResponseMessage;
  }>()
);
export const DataSourceDataUpdatedSuccess = createAction(
  '[update DataSource data Success] Update DataSource Data Success',
  props<{ payload: any }>()
);

export const DataSourceDataDeleteSuccess = createAction(
  '[update DataSource data delete Success] Update DataSource Data delete Success',
  props<{ recordId: string }>()
);

export const PatchDataSouceData = createAction(
  '[Patch DataSource Data ] Patch DataSource Data',
  props<{ payload: PatchDataSourceData | PatchDataSourceData[] }>()
);

export const ReplaceDataSource = createAction(
  '[Replace DataSource Data ] Replace DataSource Data',
  props<{ payload: any }>()
);
