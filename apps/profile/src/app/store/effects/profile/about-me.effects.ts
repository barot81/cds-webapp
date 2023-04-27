import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/profile/about-me.actions';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class AboutMeEffects {

  updateAboutMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateAboutMe),
      mergeMap(action =>
        this._profileAPIClient.editStudentAboutMe(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateAboutMeSuccess({
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
            Logger.error(`StudentModule : Error in AboutMeEffects for UpdateAboutMe action: ${error}`);
            return of(ProfileActions.AboutMeLoadError(error));
          })
        )
      )
    )
  }
  );

  updateResumeKey$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateResumeKey),
      mergeMap(action =>
        this._profileAPIClient.editStudentAboutMe(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateResumeKeySuccess({
                payload: {
                  id: data.id,
                  changes: data
                }
              }),
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in AboutMeEffects for UpdateResumeKey action: ${error}`);
            return of(ProfileActions.AboutMeLoadError(error));
          })
        )
      )
    )
  }
  );

  addAboutMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddAboutMe),
      mergeMap(action =>
        this._profileAPIClient.postStudentAboutMe(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddAboutMeSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in AboutMeEffects for AddAboutMe action: ${error}`);
            return of(ProfileActions.AboutMeLoadError(error));
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
