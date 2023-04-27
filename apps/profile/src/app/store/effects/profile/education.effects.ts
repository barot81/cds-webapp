import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as ProfileActions from '../../actions/profile/education.actions';
import * as DrawerActions from '@exxat/ux';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class EducationEffects {

  updateEducation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateEducation),
      mergeMap(action =>
        this._profileAPIClient.editStudentEducation(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateEducationSuccess({
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
            Logger.error(`StudentModule : Error in EducationEffects for UpdateEducation action: ${error}`);
            return of(ProfileActions.EducationLoadError(error));
          })
        )
      )
    )
  }
  );

  addEducation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddEducation),
      mergeMap(action =>
        this._profileAPIClient.postStudentEducation(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddEducationSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in EducationEffects for AddEducation action: ${error}`);
            return of(ProfileActions.EducationLoadError(error));
          })
        )
      )
    )
  );

  deleteEducation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.DeleteEducation),
      mergeMap(action =>
        this._profileAPIClient.deleteStudentEducation(action.id).pipe(
          switchMap(data => {
            return [
              ProfileActions.DeleteEducationSuccess({ payload: action.id }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Deleted Successfully.',
                panelClass: 'snackbar-danger'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in EducationEffects for DeleteEducation action: ${error}`);
            return of(ProfileActions.EducationLoadError(error));
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
