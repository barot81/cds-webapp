import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import * as messg from '@exxat/profile/constants';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/profile/enrollment.actions';
import { Logger } from '@exxat/fusion/core';

@Injectable({providedIn: 'any'})
export class EnrollmentEffects {

  updateEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateEnrollment),
      mergeMap(action =>
        this._profileAPIClient.editStudentEnrollment(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateEnrollmentSuccess({
                payload: {
                  id: data.id,
                  changes: data
                }
              }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Updated Successfully.',
                panelClass: messg.Message.Success
              })
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in EnrollmentEffects for UpdateEnrollment action: ${error}`);
            return of(ProfileActions.EnrollmentLoadError(error));
          })
        )
      )
    )
  }
  );

  updateStudentNumber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateStudentNumber),
      mergeMap(action =>
        this._profileAPIClient.editStudentNumber(action.id, action.payload).pipe(
          switchMap(enrolData => {
            return [
              ProfileActions.UpdateEnrollmentSuccess({
                payload: {
                  id: enrolData.id,
                  changes: enrolData
                }
              }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Updated Successfully.',
                panelClass: messg.Message.Success
              })
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in EnrollmentEffects for UpdateEnrollment action: ${error}`);
            return of(ProfileActions.EnrollmentLoadError(error));
          })
        )
      )
    )
  }
  );

  addEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddEnrollment),
      mergeMap(action =>
        this._profileAPIClient.postStudentEnrollment(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddEnrollmentSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: messg.Message.Success
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in EnrollmentEffects for AddEnrollment action: ${error}`);
            return of(ProfileActions.EnrollmentLoadError(error));
          })
        )
      )
    )
  );

  deleteEnrollment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.DeleteEnrollment),
      mergeMap(action =>
        this._profileAPIClient.deleteStudentEnrollment(action.id).pipe(
          switchMap(data => {
            return [
              ProfileActions.DeleteEnrollmentSuccess({ payload: action.id }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Deleted Successfully.',
                panelClass: 'snackbar-danger'
              })
            ];
          }),
          catchError((error) => {
            return of(ProfileActions.EnrollmentLoadError(error));
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
