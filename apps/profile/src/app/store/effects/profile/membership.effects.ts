import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/profile/membership.actions';
import { of } from 'rxjs';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class MembershipEffects {

  updateMembership$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateMembership),
      mergeMap(action =>
        this._profileAPIClient.editStudentMembership(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateMembershipSuccess({
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
            Logger.error(`StudentModule : Error in MembershipEffects for UpdateMembership action: ${error}`);
            return of(ProfileActions.MembershipLoadError(error));
          })
        )
      )
    )
  }
  );

  addMembership$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddMembership),
      mergeMap(action =>
        this._profileAPIClient.postStudentMembership(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddMembershipSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in MembershipEffects for UpdateMembership action: ${error}`);
            return of(ProfileActions.MembershipLoadError(error));
          })
        )
      )
    )
  );

  deleteMembership$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.DeleteMembership),
      mergeMap(action =>
        this._profileAPIClient.deleteStudentMembership(action.id).pipe(
          switchMap(data => {
            return [
              ProfileActions.DeleteMembershipSuccess({ payload: action.id }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Deleted Successfully.',
                panelClass: 'snackbar-danger'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in MembershipEffects for DeleteMembership action: ${error}`);
            return of(ProfileActions.MembershipLoadError(error));
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
