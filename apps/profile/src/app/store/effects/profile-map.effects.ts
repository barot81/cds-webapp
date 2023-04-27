import { AboutMeEffects } from './profile/about-me.effects';
import {
  PersonelInformationEffects,
  ConsentEffects,
  ContactEffects,
  EducationEffects,
  RelatedExperienceEffects,
  WorkExperienceEffects,
  EnrollmentEffects,
  DemographicEffects,
  MembershipEffects,
  LicensureEffects,
  ProfileListEffects } from './profile';

  //skills
  import {
  AwardEffects,
  CertificationEffects,
  LanguageEffects,
  OtherScholarlyActivityEffects,
  SeminarEffects,
  PublicationEffects } from './skills';

  //profile
  import { ProfileEffects } from './profile.effects';

  //contact
  import { CurrentAddressEffects, EmergencyAddressEffects, PermanentAddressEffects } from './contact';

  //academic
  import {AssociatedFacultyEffects, InternalNoteEffects, RequiredClinicalEffects, SharedNoteEffects} from './academic';

  //cohort
  import { CohortInformationEffects, StudentProgramRequirementEffects } from './cohort';

  //plan programme
  import { ClinicalSettingsEffects } from './plan';
import { TagMasterEffects, StudentTagEffects } from './tag';
import { StudentCommunicationLogEffects } from './communication/student-communicationlog.effects';
import { InterventionLogEffects, InterventionFollowUpEffects } from './interventionLog';

export const effects = [
  PersonelInformationEffects,
  ProfileListEffects,
  ConsentEffects,
  ContactEffects,
  EducationEffects,
  RelatedExperienceEffects,
  WorkExperienceEffects,
  AboutMeEffects,
  EnrollmentEffects,
  DemographicEffects,
  MembershipEffects,
  LicensureEffects,

  //skills
  AwardEffects,
  CertificationEffects,
  LanguageEffects,
  OtherScholarlyActivityEffects,
  PublicationEffects,
  SeminarEffects,

  //profile
  ProfileEffects,

  //contact
  CurrentAddressEffects,
  EmergencyAddressEffects,
  PermanentAddressEffects,

  //academic
  AssociatedFacultyEffects,
  InternalNoteEffects,
  RequiredClinicalEffects,
  SharedNoteEffects,

  //cohort
  CohortInformationEffects,

  //plan programme
  ClinicalSettingsEffects,

  //tag
  TagMasterEffects,
  StudentTagEffects,

  //communication
  StudentCommunicationLogEffects,

  //intervention
  InterventionLogEffects,
  InterventionFollowUpEffects,

  //programRequirement
  StudentProgramRequirementEffects

]
