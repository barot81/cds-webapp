import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/profile/licensure.actions';
import { of } from 'rxjs';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class LicensureEffects {

  updateLicensure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateLicensure),
      mergeMap(action =>
        this._profileAPIClient.editStudentLicensure(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateLicensureSuccess({
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
            Logger.error(`StudentModule : Error in LicensureEffects for UpdateLicensure action: ${error}`);
            return of(ProfileActions.LicensureLoadError(error));
          })
        )
      )
    )
  }
  );

  addLicensure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddLicensure),
      mergeMap(action =>
        this._profileAPIClient.postStudentLicensure(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddLicensureSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in LicensureEffects for AddLicensure action: ${error}`);
            return of(ProfileActions.LicensureLoadError(error));
          })
        )
      )
    )
  );

  deleteLicensure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.DeleteLicensure),
      mergeMap(action =>
        this._profileAPIClient.deleteStudentLicensure(action.id).pipe(
          switchMap(data => {
            return [
              ProfileActions.DeleteLicensureSuccess({ payload: action.id }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Deleted Successfully.',
                panelClass: 'snackbar-danger'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in LicensureEffects for DeleteLicensure action: ${error}`);
            return of(ProfileActions.LicensureLoadError(error));
          })
        )
      )
    )
  }

  );

  constructor(
    private readonly actions$: Actions,
    private readonly _profileAPIClient: ProfileApiClient
  ) { }
}
