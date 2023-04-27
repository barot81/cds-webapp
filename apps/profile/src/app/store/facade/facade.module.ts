import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConsentFacade } from './profile/consent.facade';
import { ContactFacade } from './profile/contact.facade';
import { EducationFacade } from './profile/education.facade';
import { RelatedExperienceFacade } from './profile/related-experience.facade';
import { WorkExperienceFacade } from './profile/work-experience.facade';
import { DemographicFacade } from './profile/demographic.facade';
import { EnrollmentFacade } from './profile/enrollment.facade';
import { AboutMeFacade } from './profile/about-me.facade';
import { MembershipFacade } from './profile/membership.facade';
import { LicensureFacade } from './profile/licensure.facade';
import { PersonalInformationFacade } from './profile/personel-information.facade';
import { ProfileListFacade } from './profile/profile-list.facade';

import {AwardFacade, CertificationFacade, LanguageFacade, OtherScholarlyActivityFacade,PublicationFacade, SeminarFacade } from './skills';

import { CurrentAddressFacade, EmergencyAddressFacade, PermanentAddressFacade } from './contact';

import { AssociatedFacultyFacade,InternalNoteFacade,RequiredClinicalFacade,SharedNoteFacade } from './academic';

import { CohortInformationFacade, StudentProgramRequirementFacade } from './cohort';
import { ClinicalSettingsFacade } from './plan';

import { TagMasterFacade, StudentTagFacade } from './tag';
import { StudentCommunicationLogFacade } from './communication/student-communicationlog.facade';

import { InterventionLogFacade } from './interventionLog/interventionLog.facade';
import { InterventionFollowUpFacade } from './interventionLog/interventionFollowUp.facade';

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
  providers: [
    PersonalInformationFacade,
    ProfileListFacade,
    ConsentFacade,
    ContactFacade,
    EducationFacade,
    RelatedExperienceFacade,
    WorkExperienceFacade,
    AboutMeFacade,
    EnrollmentFacade,
    DemographicFacade,
    MembershipFacade,
    LicensureFacade,

    AwardFacade,
    CertificationFacade,
    LanguageFacade,
    OtherScholarlyActivityFacade,
    PublicationFacade,
    SeminarFacade,

    CurrentAddressFacade,
    EmergencyAddressFacade,
    PermanentAddressFacade,

    AssociatedFacultyFacade,
    InternalNoteFacade,
    RequiredClinicalFacade,
    SharedNoteFacade,

    CohortInformationFacade,
    StudentProgramRequirementFacade,

    ClinicalSettingsFacade,

    TagMasterFacade,
    StudentTagFacade,

    StudentCommunicationLogFacade,

    InterventionLogFacade,
    InterventionFollowUpFacade
  ],
})
export class ProfileFacadeModule { }
