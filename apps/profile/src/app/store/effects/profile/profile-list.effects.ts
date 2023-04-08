import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileApiClient } from '@exxat/profile/services';
import * as ProfileListActions from '../../actions/profile/profile-list.actions';
import { of } from 'rxjs';
import { Logger, UserTypeService, GlobalVariable } from '@exxat/fusion/core';
import { UserPersona } from '@exxat/fusion/models';
import { ProfileList } from '@exxat/profile/models';

@Injectable({providedIn: 'any'})
export class ProfileListEffects {

  getStudentList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileListActions.LoadProfileList),
      mergeMap(action => {
        if (this.userTypeService.getUserType() === UserPersona.FacultyPersona) {
          return this._profileApiClient.getAdviseesList(action.payload, GlobalVariable.referenceKey).pipe(
            switchMap(data => {
              return this.LoadProfileList(data);
            }),
            catchError(error => {
              Logger.error(`StudentModule : Error in ProfileListEffects for getStudentList action: ${error}`);
              return of(ProfileListActions.ProfileListLoadError(error));
            })
          )
        }
        else {
          return this._profileApiClient.getStudentList(action.payload).pipe(
            switchMap(data => {
              return this.LoadProfileList(data);
            }),
            catchError(error => {
              Logger.error(`StudentModule : Error in ProfileListEffects for getStudentList action: ${error}`);
              return of(ProfileListActions.ProfileListLoadError(error));
            })
          )
        }
      }
      )
    ));

  constructor(
    private readonly actions$: Actions,
    private readonly _profileApiClient: ProfileApiClient,
    private readonly userTypeService: UserTypeService
  ) { }

  private LoadProfileList(data: ProfileList) {
    return [
      ProfileListActions.ProfileListLoaded({ payload: data })
    ];
  }
}
