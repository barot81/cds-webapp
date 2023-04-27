import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/profile/related-experience.actions';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class RelatedExperienceEffects {

  updateRelatedExperience$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateRelatedExperience),
      mergeMap(action =>
        this._profileAPIClient.editStudentRelatedExperience(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateRelatedExperienceSuccess({
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
            Logger.error(`StudentModule : Error in RelatedExperienceEffects for UpdateRelatedExperience action: ${error}`);
            return of(ProfileActions.RelatedExperienceLoadError(error));
          })
        )
      )
    )
  }
  );

  addRelatedExperience$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddRelatedExperience),
      mergeMap(action =>
        this._profileAPIClient.postStudentRelatedExperience(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddRelatedExperienceSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ]
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in RelatedExperienceEffects for AddRelatedExperience action: ${error}`);
            return of(ProfileActions.RelatedExperienceLoadError(error));
          })
        )
      )
    )
  );

  deleteRelatedExperience$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.DeleteRelatedExperience),
      mergeMap(action =>
        this._profileAPIClient.deleteStudentRelatedExperience(action.id).pipe(
          switchMap(data => {
            return [
              ProfileActions.DeleteRelatedExperienceSuccess({ payload: action.id }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Deleted Successfully.',
                panelClass: 'snackbar-danger'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in RelatedExperienceEffects for DeleteRelatedExperience action: ${error}`);
            return of(ProfileActions.RelatedExperienceLoadError(error));
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
