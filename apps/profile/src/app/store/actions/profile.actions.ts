import { createAction, props } from '@ngrx/store';

export const GetBasicInformation = createAction(
  '[Get BasicInformation] Get BasicInformation',
  props<{ payload: string}>()
);

export const GetDelegatorBasedBasicInformation = createAction(
  '[Get GetDelegatorBasedBasicInformation] Get GetDelegatorBasedBasicInformation',
  props<{ payload: string}>()
);

export const LoadBasicInformation = createAction(
  '[Load BasicInformation] Load BasicInformation'
);

export const BasicInformationLoaded = createAction(
  '[BasicInformation Loaded] BasicInformation  Loaded'
);

export const GetProfileInformation = createAction(
  '[Get ProfileInformation] Get ProfileInformation',
  props<{ payload: string}>()
);

export const LoadProfileInformation = createAction(
  '[Load ProfileInformation] Load ProfileInformation',
);

export const ProfileInformationLoaded = createAction(
  '[ProfileInformation Loaded] ProfileInformation Loaded',
);

export const GetSkillsInformation = createAction(
  '[Get SkillsInformation] Get SkillsInformation',
  props<{ payload: string}>()
);

export const LoadSkillsInformation = createAction(
  '[Load SkillsInformation] Load SkillsInformation',
);

export const SkillsInformationLoaded = createAction(
  '[SkillsInformation Loaded] SkillsInformation Loaded',
);

export const GetContactInformation = createAction(
  '[Get ContactInformation] Get ContactInformation',
  props<{ payload: string}>()
);

export const LoadContactInformation = createAction(
  '[Load ContactInformation] Load ContactInformation',
);

export const ContactInformationLoaded = createAction(
  '[ContactInformation Loaded] ContactInformation Loaded',
);

export const GetStudentEnrollment = createAction(
  '[Get StudentEnrollment] Get StudentEnrollment',
  props<{ payload: string}>()
);

export const LoadStudentEnrollment = createAction(
  '[Load StudentEnrollment] Load StudentEnrollment',
);

export const StudentEnrollmentLoaded = createAction(
  '[StudentEnrollment Loaded] StudentEnrollment Loaded',
);

export const GetAcademicInformation = createAction(
  '[Get AcademicInformation] Get AcademicInformation',
  props<{ payload: string}>()
);

export const LoadAcademicInformation = createAction(
  '[Load AcademicInformation] Load AcademicInformation',
);

export const AcademicInformationLoaded = createAction(
  '[AcademicInformation Loaded] AcademicInformation Loaded',
  // props<{ payload: string}>()
);

export const GetStudentCommunicationLog = createAction(
  '[Get StudentCommunicationLog] Get StudentCommunicationLog',
  props<{ payload: string}>()
);

export const GetInterventionLog = createAction(
  '[Get InterventionLog] Get InterventionLog',
  props<{ payload: string}>()
);


export const GetInterventionFollowUp = createAction(
  '[Get InterventionFollowUp] Get InterventionFollowUp',
  props<{ payload: string}>()
);
