import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';

import * as ProfileActions from '../../actions/profile/work-experience.actions';
import * as DrawerActions from '@exxat/ux';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class WorkExperienceEffects {

  updateWorkExperience$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateWorkExperience),
      mergeMap(action =>
        this._profileAPIClient.editStudentWorkExperience(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateWorkExperienceSuccess({
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
            Logger.error(`StudentModule : Error in WorkExperienceEffects for UpdateWorkExperience action: ${error}`);
            return of(ProfileActions.WorkExperienceLoadError(error));
          })
        )
      )
    )
  }
  );

  addWorkExperience$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddWorkExperience),
      mergeMap(action =>
        this._profileAPIClient.postStudentWorkExperience(action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.AddWorkExperienceSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
              //DrawerActions.CloseDrawer()
            ]
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in WorkExperienceEffects for AddWorkExperience action: ${error}`);
            return of(ProfileActions.WorkExperienceLoadError(error));
          })
        )
      )
    )
  );

  deleteWorkExperience$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.DeleteWorkExperience),
      mergeMap(action =>
        this._profileAPIClient.deleteStudentWorkExperience(action.id).pipe(
          switchMap(data => {
            return [
              ProfileActions.DeleteWorkExperienceSuccess({ payload: action.id }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Deleted Successfully.',
                panelClass: 'snackbar-danger'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in WorkExperienceEffects for DeleteWorkExperience action: ${error}`);
            return of(ProfileActions.WorkExperienceLoadError(error));
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
