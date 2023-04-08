import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RouterStateUrl, RouterStateFacade } from '@zhealthcare/ux';
import { GlobalVariable } from '@zhealthcare/fusion/core';
import { StudentProfileAppState } from '../reducers/profile.reducers';
import * as fromActions from '../actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { profileCacheQuery } from '../selectors/profile-cache.selectors';
import { aboutMeQuery } from '../selectors/profile/about-me.selectors';

@Injectable({providedIn: 'any'})
export class ProfileFacade {
  profileCachedIdsLookup$ = this.store.pipe(select(profileCacheQuery.profileCachedIdsLookup));
  AboutMe$ = this.store.pipe(select(aboutMeQuery.getAboutMe));
  private readonly _unsubscribe: Subject<any>;

  constructor(
    private readonly store: Store<StudentProfileAppState>,
    private readonly routerStore: Store<RouterStateUrl>,
    private readonly _routerStateFacade: RouterStateFacade
  ) {
    this._unsubscribe = new Subject();
  }

  getAboutMe(id) {
    this.store.dispatch(fromActions.GetAboutMe(id));
  }

  profileCachedIdsLookup(entity) {
    return this.store.pipe(select(profileCacheQuery.profileCachedIdsLookup(entity)))
  }

  getBasicInformation() {
    this.profileCachedIdsLookup('basicInfo').pipe(takeUntil(this._unsubscribe)).subscribe(response => {
      if (!response) {
        this._routerStateFacade.getRouteState().then(id => {
          if (id?.params?.profileId != null) {
            this.store.dispatch(fromActions.LoadAboutMe({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.LoadDemographic({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.LoadContact({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.GetBasicInformation({ payload: id?.params?.profileId }));
          }
        })
      }
    })
  }

  getDelegatorBasedBasicInformation() {
    this.profileCachedIdsLookup('basicInfo').pipe(takeUntil(this._unsubscribe)).subscribe(response => {
      if (!response) {
        this._routerStateFacade.getRouteState().then(id => {
          if (id?.params?.profileId != null) {
            this.store.dispatch(fromActions.LoadAboutMe({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.LoadContact({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.GetDelegatorBasedBasicInformation({ payload: id?.params?.profileId }));
          }
        })
      }
    })
  }

  basicInformationLoaded() {
    this.store.dispatch(fromActions.BasicInformationLoaded());
  }

  getProfileInformation() {
    this.profileCachedIdsLookup('relativeInfo').pipe(takeUntil(this._unsubscribe)).subscribe(response => {
      if (!response) {
        this._routerStateFacade.getRouteState().then(id => {
          if (id?.params?.profileId != null) {
            this.store.dispatch(fromActions.LoadEducation({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.LoadMembership({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.LoadLicensure({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.LoadWorkExperience({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.LoadRelatedExperience({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.GetProfileInformation({ payload: id?.params?.profileId }));
          }
        })
      }
    })
  }


  skillsInformationLoaded() {
    this.store.dispatch(fromActions.SkillsInformationLoaded());
  }


  contactInformationLoaded() {
    this.store.dispatch(fromActions.ContactInformationLoaded());
  }

  getStudentEnrollment() {
    this.profileCachedIdsLookup('profileInfo').pipe(takeUntil(this._unsubscribe)).subscribe(response => {
      if (!response) {
        this._routerStateFacade.getRouteState().then(id => {
          if (id?.params?.profileId !== null && id?.params?.profileId !== undefined) {
            this.store.dispatch(fromActions.LoadPersonalInformation({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.LoadEnrollment({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.GetStudentEnrollment({ payload: id?.params?.profileId }));
            this.store.dispatch(fromActions.LoadStudentTag({payload: id?.params?.profileId}))
          }
          else if (GlobalVariable.referenceKey !== null && GlobalVariable.referenceKey !== undefined){
            this.store.dispatch(fromActions.LoadEnrollment({ payload: GlobalVariable.referenceKey}));
            this.store.dispatch(fromActions.GetStudentEnrollment({ payload: GlobalVariable.referenceKey }));
          }
        });
      }
    })
  }

  studentEnrollmentLoaded() {
    this.store.dispatch(fromActions.StudentEnrollmentLoaded());
  }

}
