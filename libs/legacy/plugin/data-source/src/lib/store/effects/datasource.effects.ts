import { Injectable } from '@angular/core';
import { HttpResponseHandler } from '@exxat/fusion/core';
import * as DrawerActions from '@exxat/ux';
import { SnackbarService } from '@exxat/ux';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, debounceTime, switchMap, take } from 'rxjs/operators';
import { DataSourceResponse } from '../../models/response.model';
import { DataSourceService } from '../../services/datasource.service';
import * as datasourceActions from '../actions/datasource.actions';

@Injectable({ providedIn: 'any' })
export class DataSourceEffects {
  DataSourceLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(datasourceActions.LoadDataSource),
      switchMap(action =>
        this.dataSourceService
          .getEndpoint(action.endPoint, action.applyPagination)
          .pipe(
            take(1),
            switchMap(dataEndPoint =>
              this.dataSourceService.getDataSource(
                dataEndPoint,
                action.customHeaders,
                action.requestType,
                action.applyPagination
              )
            ),
            switchMap((response: DataSourceResponse<any>) => {
              return [
                datasourceActions.DataSourceLoaded({
                  payload: this.formatResponse(response, action.endPoint)
                })
              ];
            }),
            catchError((error, source) => {
              this.httpResponseHandler.onCatch(error, source)
              return of(datasourceActions.DataSourceLoadError(error));
            })
          )
      )
    )
  );

  InitializeDataSource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(datasourceActions.InitializeDataSource),
      switchMap(action =>
        this.dataSourceService
          .getEndpoint(action.payload.endPoint, action.payload.applyPagination)
          .pipe(
            take(1),
            switchMap(dataEndPoint =>
              this.dataSourceService.getDataSource(
                dataEndPoint,
                action.payload.customHeaders,
                action.payload.requestType,
                action.payload.applyPagination
              )
            ),
            switchMap((response: DataSourceResponse<any>) => {

              return [
                datasourceActions.DataSourceLoaded({
                  payload: this.formatResponse(response, action.payload?.endPoint)
                })
              ];
            }),
            catchError((error, source) => {
              this.httpResponseHandler.onCatch(error, source);
              return of(datasourceActions.DataSourceLoadError(error));
            })
          )
      )
    )
  );

  SortDataSource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(datasourceActions.SortDataSource),
      switchMap(action => this.dataSourceService.getEndpoint().pipe(take(1))),
      switchMap(dataEndPoint =>
        this.dataSourceService.getDataSource(
          dataEndPoint,
          [],
          this.dataSourceService.getRequestType()
        )
      ),
      switchMap((response: DataSourceResponse<any>) => {
        return [
          datasourceActions.DataSourceSorted({
            payload: this.formatResponse(response, null)
          })
        ];
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        return of(datasourceActions.DataSourceLoadError(error));
      })
    )
  );

  updateFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(datasourceActions.UpdateFilter),
      debounceTime(600),
      switchMap(action => this.dataSourceService.getEndpoint().pipe(take(1))),
      switchMap(dataEndPoint =>
        this.dataSourceService.getDataSource(
          dataEndPoint,
          [],
          this.dataSourceService.getRequestType()
        )
      ),
      switchMap((response: DataSourceResponse<any>) => {
        return [
          datasourceActions.UpdateFilterSuccess({
            payload: this.formatResponse(response, null)
          })
        ];
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        return of(datasourceActions.DataSourceLoadError(error));
      })
    )
  );

  updateAllFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(datasourceActions.UpdateAllFilters),
      debounceTime(600),
      switchMap(action => this.dataSourceService.getEndpoint().pipe(take(1))),
      switchMap(dataEndPoint =>
        this.dataSourceService.getDataSource(
          dataEndPoint,
          [],
          this.dataSourceService.getRequestType()
        )
      ),
      switchMap((response: DataSourceResponse<any>) => {
        return [
          datasourceActions.UpdateFilterSuccess({
            payload: this.formatResponse(response, null)
          }),
          DrawerActions.CloseDrawer()
          // DrawerActions.CloseDrawerWithSnackBarMessage({ payload: 'Filters Applied Successfully.' })
        ];
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        return of(datasourceActions.DataSourceLoadError(error));
      })
    )
  );

  updateSerchFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(datasourceActions.UpdateSearchFilter),
      debounceTime(600),
      switchMap(action => this.dataSourceService.getEndpoint().pipe(take(1))),
      switchMap(dataEndPoint =>
        this.dataSourceService.getDataSource(
          dataEndPoint,
          [],
          this.dataSourceService.getRequestType()
        )
      ),
      switchMap((response: DataSourceResponse<any>) => {
        return [
          datasourceActions.UpdateFilterSuccess({
            payload: this.formatResponse(response, null)
          })
        ];
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        return of(datasourceActions.DataSourceLoadError(error));
      })
    )
  );

  DataSourceUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(datasourceActions.DataSourceUpdate),
      switchMap(action => this.dataSourceService.getEndpoint().pipe(take(1))),
      switchMap(dataEndPoint =>
        this.dataSourceService.getDataSource(
          dataEndPoint,
          [],
          this.dataSourceService.getRequestType()
        )
      ),
      switchMap((response: DataSourceResponse<any>) => {
        return [
          datasourceActions.DataSourceSorted({
            payload: this.formatResponse(response, null)
          })
        ];
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        return of(datasourceActions.DataSourceLoadError(error));
      })
    )
  );

  LoadNextBatchOfData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(datasourceActions.LoadNextBatchOfData),
      switchMap(action => this.dataSourceService.getEndpoint().pipe(take(1))),
      switchMap(dataEndPoint => {
        if (dataEndPoint)
          return this.dataSourceService.getDataSource(
            dataEndPoint,
            [],
            this.dataSourceService.getRequestType()
          );
      }),
      switchMap((response: DataSourceResponse<any>) => {
        if (response) {
          return [
            datasourceActions.NextBatchOfDataSuccess({
              payload: this.formatResponse(response, null)
            })
          ];
        }
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        return of(datasourceActions.DataSourceLoadError(error));
      })
    )
  );

  DataSourceDataUpdated$ = createEffect(() => {
    let actionMessageSuccess, actionMessageFail;
    return this.actions$.pipe(
      ofType(datasourceActions.DataSourceDataUpdated),
      switchMap(action => {
        actionMessageSuccess = action.responseMessage?.success ? action.responseMessage.success : 'Record Updated Successfully.';
        actionMessageFail = action.responseMessage?.failure;
        return this.dataSourceService
          .getDataSourceData(
            'PUT',
            action.updateEndpoint,
            action.payload,
            action.customHeaders
          )
          .pipe(take(1))
      }),
      switchMap((response: DataSourceResponse<any>) => {
        const total = Array.isArray(response) ? response.length : 1;
        this._snackbarService.openCustomSnackBar(actionMessageSuccess, 1000, 'snackbar-success');
        return [
          datasourceActions.DataSourceDataUpdatedSuccess({
            payload: this.formatResponse(response, null)
          }),
          DrawerActions.CloseDrawer()
        ];
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        if (actionMessageFail) this._snackbarService.openCustomSnackBar(actionMessageFail, 3000, 'snackbar-unsuccess');
        return of(datasourceActions.DataSourceLoadError(error));
      })
    )
  });

  DataSourceDataAdded$ = createEffect(() => {
    let actionMessageSuccess, actionMessageFail;
    return this.actions$.pipe(
      ofType(datasourceActions.DataSourceDataAdded),
      switchMap(action => {
        actionMessageSuccess = action.responseMessage?.success ? action.responseMessage.success : 'Record added successfully';
        actionMessageFail = action.responseMessage?.failure;
        return this.dataSourceService
          .getDataSourceData(
            'POST',
            action.postEndpoint,
            action.payload,
            action.customHeaders
          )
          .pipe(take(1))
      }),
      switchMap((response: DataSourceResponse<any>) => {
        const total = Array.isArray(response) ? response.length : 1;
        this._snackbarService.openCustomSnackBar(actionMessageSuccess, 1000, 'snackbar-success');
        return [
          datasourceActions.DataSourceDataAddedSuccess({
            payload: {
              data: response,
              addedCount: total
            }
          }),
          DrawerActions.CloseDrawer()
        ];
      }),
      catchError((error, source) => {
        this.httpResponseHandler.onCatch(error, source);
        if (actionMessageFail) this._snackbarService.openCustomSnackBar(actionMessageFail, 3000, 'snackbar-unsuccess');
        return of(datasourceActions.DataSourceLoadError(error));
      })
    )
  });

  constructor(
    private readonly _snackbarService: SnackbarService,
    private actions$: Actions,
    private dataSourceService: DataSourceService,
    private httpResponseHandler: HttpResponseHandler
  ) { }

  private formatResponse(response: any, endPoint: string) {
    return (response?.result && response?.count) ?
      {
        data: response.result,
        total: response.count,
        endPoint: endPoint
      } : { data: response };
  }
}
