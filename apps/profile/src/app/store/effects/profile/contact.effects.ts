import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/profile/contact.actions';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class ContactEffects {

  updateContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateContact),
      mergeMap(action =>
        this._profileAPIClient.editStudentContact(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateContactSuccess({
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
            Logger.error(`StudentModule : Error in ContactEffects for UpdateContact action: ${error}`);
            return of(ProfileActions.ContactLoadError(error));
          })
        )
      )
    )
  }
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddContact),
      mergeMap(action =>
        this._profileAPIClient.postStudentContact(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddContactSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in ContactEffects for AddContact action: ${error}`);
            return of(ProfileActions.ContactLoadError(error));
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
