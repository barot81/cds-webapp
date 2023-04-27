import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { SkillsApiClient, ProfileApiClient } from '@exxat/profile/services';
import * as DrawerActions from '@exxat/ux';
import * as ProfileActions from '../../actions/tag/tag-master.actions';
import { of } from 'rxjs';
import { Logger } from '@exxat/fusion/core';


@Injectable({providedIn: 'any'})
export class TagMasterEffects {

  getTagMaster$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.LoadStudentTagMaster),
      mergeMap(action =>
        this._profileApiClient.getTagMaster().pipe(
          switchMap(data => {
            return [
              ProfileActions.StudentTagMasterLoaded({ payload: data }),
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in TagMasterEffects for LoadStudentTagMaster action: ${error}`);
            return of(ProfileActions.StudentTagMasterLoadError(error));
          })
        )
      )
    )
  );

  updateTagMaster$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.UpdateStudentTagMaster),
      mergeMap(action =>
        this._profileApiClient.editTagMaster(action.id, action.payload).pipe(
          switchMap(data => {
            return [
              ProfileActions.UpdateStudentTagMasterSuccess({
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
            Logger.error(`StudentModule : Error in TagMasterEffects for UpdateStudentTagMaster action: ${error}`);
            return of(ProfileActions.StudentTagMasterLoadError(error));
          })
        )
      )
    )
  }
  );

  addTagMaster$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AddStudentTagMaster),
      mergeMap(action =>
        this._profileApiClient.postTagMaster(action.payload).pipe(
          switchMap((data) => {
            return [
              ProfileActions.AddStudentTagMasterSuccess({ payload: data }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Added Successfully.',
                panelClass: 'snackbar-success'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in TagMasterEffects for AddStudentTagMaster action: ${error}`);
            return of(ProfileActions.StudentTagMasterLoadError(error));
          })
        )
      )
    )
  );

  deleteTagMaster$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.DeleteStudentTagMaster),
      mergeMap(action =>
        this._profileApiClient.deleteTagMaster(action.id).pipe(
          switchMap(data => {
            return [
              ProfileActions.DeleteStudentTagMasterSuccess({ payload: action.id }),
              DrawerActions.CloseDrawerWithSnackBarMessage({
                payload: 'Record Deleted Successfully.',
                panelClass: 'snackbar-danger'
              })
            ];
          }),
          catchError((error) => {
            Logger.error(`StudentModule : Error in TagMasterEffects for DeleteStudentTagMaster action: ${error}`);
            return of(ProfileActions.StudentTagMasterLoadError(error));
          })
        )
      )
    )
  }

  );

  constructor(
    private readonly actions$: Actions,
    private readonly _profileApiClient: ProfileApiClient
  ) { }
}
