import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/tag/student-tag.actions';
import { of } from 'rxjs';
import lodash from 'lodash';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class StudentTagEffects {

  updateStudentTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateStudentTag),
      mergeMap(action =>
        this._profileApiClient.editStudentTag(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateStudentTagSuccess({
                payload: {
                  id: data.id,
                  changes: data
                }
              }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Updated Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in StudentTagEffects for UpdateStudentTag action: ${error}`);
            return of(ProfileActions.StudentTagLoadError(error));
          })
        )
      )
    )
  }
  );

  updateRangeStudentTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateRangeStudentTag),
      mergeMap(action =>
        this._profileApiClient.updateRangeStudentTag(action.payload).pipe(
          switchMap((data: any) => {
            const payLoadData = lodash.cloneDeep(data);
            payLoadData.map(x => x.isChecked = true);
            return [
              ProfileActions.UpdateRangeStudentTagSuccess({ payload: payLoadData }),
              DrawerActions.CloseDrawerWithSnackBarMessage({ payload: 'Record Range Updated Successfully.' })
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in StudentTagEffects for UpdateStudentTag action: ${error}`);
            return of(ProfileActions.StudentTagLoadError(error));
          })
        )
      )
    )
  }
  );

  addStudentTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddStudentTag),
      mergeMap(action =>
        this._profileApiClient.postStudentTag(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddStudentTagSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in StudentTagEffects for AddStudentTag action: ${error}`);
            return of(ProfileActions.StudentTagLoadError(error));
          })
        )
      )
    )
  );

  deleteStudentTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.DeleteStudentTag),
      mergeMap(action =>
        this._profileApiClient.deleteStudentTag(action.id).pipe(
          switchMap(data => {
            return [
              ProfileActions.DeleteStudentTagSuccess({ payload: action.id }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Deleted Successfully.',
                panelClass: 'snackbar-danger'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in StudentTagEffects for DeleteStudentTag action: ${error}`);
            return of(ProfileActions.StudentTagLoadError(error));
          })
        )
      )
    )
  }

  );

  deleteRangeStudentTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.DeleteRangeStudentTag),
      mergeMap(action =>
        this._profileApiClient.deleteRangeStudentTag(action.id).pipe(
          switchMap(data => {
            return [
              ProfileActions.DeleteRangeStudentTagSuccess({ payload: action.id }),
              DrawerActions.CloseDrawerWithSnackBarMessage({ payload: 'Record Range Deleted Successfully.' })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in StudentTagEffects for DeleteRangeStudentTag action: ${error}`);
            return of(ProfileActions.StudentTagLoadError(error));
          })
        )
      )
    )
  }

  );

  constructor(
    private readonly actions$: Actions,
    private readonly _profileApiClient: ProfileApiClient
  ) { }
}
