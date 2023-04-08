import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as ProfileActions from '../../actions/profile/consent.actions';
import * as DrawerActions from '@exxat/ux';
import { Logger } from '@exxat/fusion/core';

@Injectable({providedIn: 'any'})
export class ConsentEffects {

  getConsents$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProfileActions.LoadConsent),
    mergeMap(action =>
      this._profileAPIClient.getAllConsents().pipe(
        switchMap(data => {
          return [
            ProfileActions.ConsentLoaded({payload:data}),
          ];
        }),
        catchError((error) => {
          return of(ProfileActions.ConsentLoadError(error));
        })
      )
    )
  )
  );

  addConsent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.AddConsent),
      mergeMap(action =>
        this._profileAPIClient.postStudentConsent(action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.AddConsentSuccess({ payload: data }),
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in ConsentEffects for AddConsent action: ${error}`);
            return of(ProfileActions.ConsentLoadError(error));
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
