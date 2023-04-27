import { ActionReducerMap } from '@ngrx/store';
import {
  ConsentState,
  ConsentReducer,
  ContactState,
  EducationState,
  RelatedExperienceState,
  WorkExperienceState,
  AboutMeState,
  EnrollmentState,
  DemographicState,
  MembershipState,
  LicensureState,
  ContactReducer,
  EducationReducer,
  RelatedExperienceReducer,
  WorkExperienceReducer,
  AboutMeReducer,
  EnrollmentReducer,
  DemographicReducer,
  MembershipReducer,
  LicensureReducer
} from './profile';


import { PersonelInformationState, PersonelInformationReducer } from './profile/personel-information.reducers';
import { ProfileListState, ProfileListReducer } from './profile/profile-list.reducers';


import { StudentProfileCacheState, ProfileCacheReducer } from './profile-cache.reducers';


//Tag
import { TagMasterState, TagMasterReducer, StudentTagState, StudentTagReducer } from './tag';


export interface StudentProfileAppState {
  personelInformation:PersonelInformationState;
  profileList:ProfileListState;

  //tagMaster
  tagMaster: TagMasterState
  studentTag:StudentTagState

  //aggregate
  '.cache': StudentProfileCacheState,

}

export const reducers: ActionReducerMap<StudentProfileAppState> = {
  personelInformation:PersonelInformationReducer,
  profileList:ProfileListReducer,
  //aggregate
  '.cache': ProfileCacheReducer,

  //plan programme

  //tag
  tagMaster:TagMasterReducer,
  studentTag:StudentTagReducer,

};
