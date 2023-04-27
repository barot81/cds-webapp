import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/profile/demographic.actions';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class DemographicEffects {

  updateDemographic$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateDemographic),
      mergeMap(action =>
        this._profileAPIClient.editStudentDemographic(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateDemographicSuccess({
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
            Logger.error(`StudentModule : Error in DemographicEffects for UpdateDemographic action: ${error}`);
            return of(ProfileActions.DemographicLoadError(error));
          })
        )
      )
    )
  }
  );

  addDemographic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddDemographic),
      mergeMap(action =>
        this._profileAPIClient.postStudentDemographic(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddDemographicSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in DemographicEffects for AddDemographic action: ${error}`);
            return of(ProfileActions.DemographicLoadError(error));
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly _profileAPIClient: ProfileApiClient
  ) { }
}
