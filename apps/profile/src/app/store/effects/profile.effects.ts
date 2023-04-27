import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { AggregateApiClient, StudentCommunicationApiClient, ProfileApiClient } from '@exxat/profile/services';
import * as ProfileActions from '../actions/profile.actions';
import * as PersonelInformationActions from '../actions/profile/personel-information.actions';
import * as EducationActions from '../actions/profile/education.actions';
import * as WorkExperienceActions from '../actions/profile/work-experience.actions';
import * as RelatedExperienceActions from '../actions/profile/related-experience.actions';
import * as ContactActions from '../actions/profile/contact.actions';
import * as ConsentActions from '../actions/profile/consent.actions';
import * as AboutMeActions from '../actions/profile/about-me.actions';
import * as DemographicActions from '../actions/profile/demographic.actions';
import * as MembershipActions from '../actions/profile/membership.actions';
import * as EnrollmentActions from '../actions/profile/enrollment.actions';
import * as LicensureActions from '../actions/profile/licensure.actions';

//skills
import * as AwardActions from '../actions/skills/award.actions';
import * as CertificationActions from '../actions/skills/certification.actions';
import * as SeminarActions from '../actions/skills/seminar.actions';
import * as LanguageActions from '../actions/skills/language.actions';
import * as PublicationActions from '../actions/skills/publication.actions';
import * as OtherScholarlyActivityActions from '../actions/skills/other-scholarly-activity.actions';

//contact
import * as PermanentAddressActions from '../actions/contact/permanent-address.actions';
import * as CurrentAddressActions from '../actions/contact/current-address.actions';
import * as EmergencyAddressActions from '../actions/contact/emergency-address.actions';

//Tag
import * as StudentTagActions from '../actions/tag/student-tag.actions';
//
import * as SharedNoteActions from '../actions/academic/shared-note.actions';
import * as InternalNoteActions from '../actions/academic/internal-note.actions';
import * as RequiredClinicalActions from '../actions/academic/required-clinical.actions';
import * as AssociatedFacultyActions from '../actions/academic/associated-faculty.actions';
import * as ProfileCacheActions from '../actions/profile-cache.actions';

//communication
import * as CommunicationLogActions from'../actions/communication/student-communicationlog.actions';

//intervention
import * as InterventionLogActions from '../actions/interventionLog/interventionLog.actions';
import { Store } from '@ngrx/store';
import { RouterStateUrl, routeStateQuery } from '@exxat/ux';
import { Logger } from '@exxat/fusion/core';
import { GlobalVariable } from '@exxat/fusion/core';
enum NoteType { SHARED="SHARED",INTERNAL="INTERNAL"}

@Injectable({providedIn: 'any'})

export class ProfileEffects {

  //basic information

  getBasicInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.GetBasicInformation),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          return router.state?.params?.profileId.toString()
        }
      ),
      // take(1),
      mergeMap(id =>
        this._profileAPIClient.getBasicInformation(id).pipe(
          switchMap(data => {
            return [
              ProfileCacheActions.UpdateLoadedEntityInCache({ payload: id, entity: 'basicInfo' }),
              AboutMeActions.AboutMeLoaded({ payload: data?.aboutMe }),
              DemographicActions.DemographicLoaded({ payload: data?.demographic }),
              ContactActions.ContactLoaded({ payload: data?.contact }),
              ProfileActions.BasicInformationLoaded()
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetBasicInformation action: ${error}`);
            return of(ContactActions.ContactLoadError(error));
          })
        )
      )
    )
  }
  );

  // basic information

// basic information for delegator user
  getDelegatorBasedBasicInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.GetDelegatorBasedBasicInformation),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          return router.state?.params?.profileId.toString()
        }
      ),
      // take(1),
      mergeMap(id =>
        this._profileAPIClient.getDelegatorBasedBasicInformation(id).pipe(
          switchMap(data => {
            return [
              ProfileCacheActions.UpdateLoadedEntityInCache({ payload: id, entity: 'basicInfo' }),
              AboutMeActions.AboutMeLoaded({ payload: data?.aboutMe }),
              ContactActions.ContactLoaded({ payload: data?.contact }),
              ProfileActions.BasicInformationLoaded()
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetDelegatorBasedBasicInformation action: ${error}`);
            return of(ContactActions.ContactLoadError(error));
          })
        )
      )
    )
  }
  );

  // basic information for delegator user

  //profile information

  getProfileInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.GetProfileInformation),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          return router.state?.params?.profileId?.toString()
        }
      ),
      // take(1),
      mergeMap(id =>
        this._profileAPIClient.getProfileInformation(id).pipe(
          switchMap(data => {
            return [
              ProfileCacheActions.UpdateLoadedEntityInCache({ payload: id, entity: 'relativeInfo' }),
              EducationActions.EducationLoaded({ payload: data?.educations }),
              WorkExperienceActions.WorkExperienceLoaded({payload: data?.workExperiences}),
              RelatedExperienceActions.RelatedExperienceLoaded({payload: data?.relatedExperiences}),
              MembershipActions.MembershipLoaded({ payload: data?.memberships }),
              LicensureActions.LicensureLoaded({ payload: data?.licensures }),
              ProfileActions.ProfileInformationLoaded()
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetProfileInformation action: ${error}`);
            return of(MembershipActions.MembershipLoaded(error));
          })
        )
      )
    )
  }
  );

  //profile information

  //skill information

  getSkillsInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.GetSkillsInformation),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          return router.state?.params?.profileId?.toString()
        }
      ),
      // take(1),
      mergeMap(id =>
        this._profileAPIClient.getSkillsInformation(id).pipe(
          switchMap(data => {
            return [
              ProfileCacheActions.UpdateLoadedEntityInCache({ payload: id, entity: 'skillsInfo' }),
              AwardActions.AwardLoaded({ payload: data?.awards }),
              CertificationActions.CertificationLoaded({ payload: data?.certifications }),
              SeminarActions.SeminarLoaded({ payload: data?.seminars }),
              LanguageActions.LanguageLoaded({ payload: data?.languages }),
              PublicationActions.PublicationLoaded({ payload: data?.publications }),
              OtherScholarlyActivityActions.OtherScholarlyActivityLoaded({ payload: data?.otherScholarlyActivities }),
              ProfileActions.SkillsInformationLoaded()
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetSkillsInformation action: ${error}`);
            return of(AwardActions.AwardLoaded(error));
          })
        )
      )
    )
  }
  );

  // skill information

  //contact information

  getContactInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.GetContactInformation),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          if(router.state?.params?.profileId) {
            return router.state?.params?.profileId.toString()
          }
          else{
            return GlobalVariable.referenceKey;
          }
        }
      ),
      // take(1),
      mergeMap(id =>
        this._profileAPIClient.getContactInformation(id).pipe(
          switchMap(data => {
            return [
              ProfileCacheActions.UpdateLoadedEntityInCache({ payload: id, entity: 'contactInfo' }),
              CurrentAddressActions.CurrentAddressLoaded({ payload: data?.currentAddress }),
              PermanentAddressActions.PermanentAddressLoaded({ payload: data?.permanentAddress }),
              EmergencyAddressActions.EmergencyAddressLoaded({ payload: data?.emergencyAddresses }),
              ProfileActions.ContactInformationLoaded()
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetContactInformation action: ${error}`);
            return of(CurrentAddressActions.CurrentAddressLoaded(error));
          })
        )
      )
    )
  }
  );

  //contact information

  //student enrollment

  getStudentEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.GetStudentEnrollment),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          if(router.state?.params?.profileId === undefined ){
            return GlobalVariable.referenceKey
          }
          else{
            return router.state?.params?.profileId.toString()
          }
        }
      ),
      mergeMap(id =>
        this._profileAPIClient.getStudentEnrollment(id).pipe(
          switchMap(data => {
            return [
              ProfileCacheActions.UpdateLoadedEntityInCache({ payload: id, entity: 'profileInfo' }),
              PersonelInformationActions.PersonalInformationLoaded({ payload: data?.profile }),
              EnrollmentActions.EnrollmentLoaded({ payload: data?.enrollment }),
              StudentTagActions.StudentTagLoaded({payload:data?.studentTags}),
              ProfileActions.StudentEnrollmentLoaded()
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetStudentEnrollment action: ${error}`);
            return of(PersonelInformationActions.PersonalInformationLoadError(error));
          })
        )
      )
    )
  );

  // student enrollment

  // academic information

  getAcademicInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.GetAcademicInformation),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          return router.state?.params?.profileId.toString()
        }
      ),
      // take(1),
      mergeMap(id =>

        this._profileAPIClient.getAcademicInformation(id).pipe(
          switchMap(data => {
            return [
              ProfileCacheActions.UpdateLoadedEntityInCache({ payload: id, entity: 'academicInfo' }),
              ConsentActions.ConsentLoaded({payload:data?.consents}),

              SharedNoteActions.SharedNoteLoaded({ payload: data?.profileNotes?.filter(x=>x.noteType.toUpperCase() === NoteType.SHARED)}),
              InternalNoteActions.InternalNoteLoaded({ payload: data?.profileNotes?.filter(x=>x.noteType.toUpperCase() === NoteType.INTERNAL)}),
              RequiredClinicalActions.RequiredClinicalLoaded({ payload: data?.requiredClinicals }),
              AssociatedFacultyActions.AssociatedFacultyLoaded({ payload: data?.associatedFaculties }),
              ProfileActions.AcademicInformationLoaded()
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetAcademicInformation action: ${error}`);
            return of(SharedNoteActions.SharedNoteLoadError(error));
          })
        )
      )
    )
  }
  );

  // academic information

  // student communicationLog
  getStudentCommunicationLog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.GetStudentCommunicationLog),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          return router.state?.params?.profileId.toString()
        }
      ),
      // take(1),
      mergeMap(id =>
        this._communicationlogAPIClient.getStudentCommunicationLogByEntityId(id).pipe(
          switchMap(data => {
            return [
              ProfileCacheActions.UpdateLoadedEntityInCache({ payload: id, entity: 'studentCommunicationLog' }),
              CommunicationLogActions.StudentCommunicationLogLoaded({payload:data})
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetStudentCommunicationLog action: ${error}`);
            return of(CommunicationLogActions.StudentCommunicationLogLoadError(error));
          })
        )
      )
    )
  }
  );

  // student communicationLog
  getInterventionLog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.GetInterventionLog),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          return router.state?.params?.profileId.toString()
        }
      ),
      // take(1),
      mergeMap(id =>
        this._profileAPIClient.getInterventionLogByStudentId(id).pipe(
          switchMap(data => {
            return [
              ProfileCacheActions.UpdateLoadedEntityInCache({ payload: id, entity: 'interventionLog' }),
              InterventionLogActions.InterventionLogLoaded({payload:data})
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetInterventionLog action: ${error}`);
            return of(InterventionLogActions.InterventionLogLoadError(error));
          })
        )
      )
    )
  }
  );

  //about me for resume upload
  getAboutMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AboutMeActions.GetAboutMe),
      withLatestFrom(
        this._store.select(routeStateQuery.getRouteState),
        (action, router) => {
          return router.state?.params?.profileId.toString()
        }
      ),
      // take(1),
      mergeMap(id =>
        this._profileSingleAPIClient.getAboutMe(id).pipe(
          switchMap(data => {
            return [
              AboutMeActions.AboutMeLoaded({ payload: data }),
            ];
          }),
          catchError(error => {
            Logger.error(`StudentModule : Error in ProfileEffects for GetAboutMe action: ${error}`);
            return of(AboutMeActions.AboutMeLoadError(error));
          })
        )
      )
    )
  }
  );


  constructor(
    private readonly actions$: Actions,
    private readonly _profileAPIClient: AggregateApiClient,
    private readonly _profileSingleAPIClient: ProfileApiClient,
    private readonly _communicationlogAPIClient:StudentCommunicationApiClient,
    private readonly _store: Store<RouterStateUrl>
  ) { }
}
