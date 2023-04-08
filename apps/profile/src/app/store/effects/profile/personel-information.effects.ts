import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/profile/personel-information.actions';
import { of } from 'rxjs';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class PersonelInformationEffects {

  updatePersonelInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdatePersonalInformation),
      mergeMap(action =>
        this._profileAPIClient.editStudentProfile(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdatePersonalInformationSuccess({
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
            Logger.error(`StudentModule : Error in PersonelInformationEffects for UpdatePersonalInformation action: ${error}`);
            return of(ProfileActions.PersonalInformationLoadError(error));
          })
        )
      )
    )
  }
  );

  addPersonelInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddPersonalInformation),
      mergeMap(action =>
        this._profileAPIClient.postStudentProfile(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddPersonalInformation({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in PersonelInformationEffects for AddPersonalInformation action: ${error}`);
            return of(ProfileActions.PersonalInformationLoadError(error));
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
