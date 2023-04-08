


export class FEATURECODE {
  //communicationLog
  public studentFeatureCommunicationLogInformation: string;

  //Student
  public studentFeatureProfile: string;
  public studentFeatureRequiredClinical: string;
  public studentFeatureWorkExperience: string;
  public studentFeatureEducation: string;
  public studentFeatureCurrentAddress: string;
  public studentFeatureEmergencyAddress: string;
  public studentFeatureOtherAddress: string;
  public studentFeaturePermanentAddress: string;
  public studentFeatureFile: string;
  public studentFeatureAboutMe: string;
  public studentFeatureAward: string;
  public studentFeatureCertification: string;
  public studentFeatureLanguage: string;
  public studentFeatureInterventionLog: string;
  public studentFeatureMembership: string;
  public studentFeatureOtherScholarlyActivity: string;
  public studentFeaturePublication: string;
  public studentFeatureSeminar: string;
  public studentFeatureMail: string;
  public studentFeatureNotificationDetails: string;
  public studentFeatureOverview: string;
  public studentFeatureConsent: string;
  public studentFeatureContact: string;
  public studentFeatureDemographic: string;
  public studentFeatureEnrollment: string;
  public studentFeatureRelatedExperience: string;
  public studentFeatureLicensure: string;
  public studentFeatureCohort: string;
  public studentFeatureSharedNote: string;
  public studentFeatureInternalNote: string;
  public studentFeatureAssociatedFaculty: string;
  public studentFeatureStudentReportConfig: string;
  public studentFeatureCommunicationLog: string;
  public studentFeatureAdvancedView: string;

  // //cohort
  public cohortFeatureInformation: string;
  public cohortFeatureRequiredClinical: string;
  public cohortFeatureAttestation: string;
  public cohortFeatureQuestionnarie: string;
  // //resource
  public resourceFeatureCategory: string;
  public resourceFeatureAnnouncement: string;
  public resourceFeatureFile: string;

  // //prerequisites
  public prerequisitesFeatureCategory: string;

  // //location-area
  public locationareaFeatureCategory: string;

  // //Faculty
  public facultyFeatureInformation: string;

  // //FacultyResource
  public facultyresourceFeatureCategory: string;
  public facultyresourceFeatureAnnouncement: string;
  public facultyresourceFeatureFile: string;

  // //compliance
  public complianceFeatureWorkflow: string;

  //--------constructor()----------//

  constructor() {

    //communicationLog
    this.studentFeatureCommunicationLogInformation = 'Service.CommunicationLog:Student.CommunicationLog.Information';

    //Student
    this.studentFeatureProfile = 'Service.Student:Student.Profile';
    this.studentFeatureRequiredClinical = 'Service.Student:Student.RequiredClinical';
    this.studentFeatureWorkExperience = 'Service.Student:Student.WorkExperience';
    this.studentFeatureEducation = 'Service.Student:Student.Education';
    this.studentFeatureCurrentAddress = 'Service.Student:Student.CurrentAddress';
    this.studentFeatureEmergencyAddress = 'Service.Student:Student.EmergencyAddress';
    this.studentFeatureOtherAddress = 'Service.Student:Student.OtherAddress';
    this.studentFeaturePermanentAddress = 'Service.Student:Student.PermanentAddress';
    this.studentFeatureFile = 'Service.Student:Student.File';
    this.studentFeatureAboutMe = 'Service.Student:Student.AboutMe';
    this.studentFeatureAward = 'Service.Student:Student.Award';
    this.studentFeatureCertification = 'Service.Student:Student.Certification';
    this.studentFeatureLanguage = 'Service.Student:Student.Language';
    this.studentFeatureInterventionLog = 'Service.Student:Student.InterventionLog';
    this.studentFeatureMembership = 'Service.Student:Student.Membership';
    this.studentFeatureOtherScholarlyActivity = 'Service.Student:Student.OtherScholarlyActivity';
    this.studentFeaturePublication = 'Service.Student:Student.Publication';
    this.studentFeatureSeminar = 'Service.Student:Student.Seminar';
    this.studentFeatureMail = 'Service.Student:Student.Mail';
    this.studentFeatureNotificationDetails = 'Service.Student:Student.NotificationDetails';
    this.studentFeatureOverview = 'Service.Student:Student.Overview';
    this.studentFeatureConsent = 'Service.Student:Student.Consent';
    this.studentFeatureContact = 'Service.Student:Student.Contact';
    this.studentFeatureDemographic = 'Service.Student:Student.Demographic';
    this.studentFeatureEnrollment = 'Service.Student:Student.Enrollment';
    this.studentFeatureRelatedExperience = 'Service.Student:Student.RelatedExperience';
    this.studentFeatureLicensure = 'Service.Student:Student.Licensure';
    this.studentFeatureCohort = 'Service.Student:Student.Cohort';
    this.studentFeatureSharedNote = 'Service.Student:Student.SharedNote';
    this.studentFeatureInternalNote = 'Service.Student:Student.InternalNote';
    this.studentFeatureAssociatedFaculty = 'Service.Student:Student.AssociatedFaculty';
    this.studentFeatureStudentReportConfig = 'Service.Student:Student.StudentReportConfig';
    this.studentFeatureCommunicationLog = 'Service.Student:Student.CommunicationLog';
    this.studentFeatureAdvancedView = 'Service.Student:Student.AdvancedView';

    //cohort
    this.cohortFeatureInformation = 'Service.StudentSetup:StudentSetup.Cohort';
    this.cohortFeatureRequiredClinical = 'Service.StudentSetup:StudentSetup.RequiredClinical';
    this.cohortFeatureAttestation = 'Service.StudentSetup:StudentSetup.Attestation';

    //resource
    this.resourceFeatureCategory = 'Service.Resource:Resource.Category';
    this.resourceFeatureAnnouncement = 'Service.Resource:Resource.Announcement';
    this.resourceFeatureFile = 'Service.Resource:Resource.File';

    //prerequisites
    this.prerequisitesFeatureCategory = 'Service.Site:Site.SiteProfile';

    //Faculty
    this.facultyFeatureInformation = 'Service.Faculty:Faculty.Infomation';

    //FacultyResource
    this.facultyresourceFeatureCategory = 'Service.FacultyResource:FacultyResource.Category';
    this.facultyresourceFeatureAnnouncement = 'Service.FacultyResource:FacultyResource.Announcement';
    this.facultyresourceFeatureFile = 'Service.FacultyResource:FacultyResource.File';

    //compliance
    this.complianceFeatureWorkflow = 'Service.Compliance.Workflow:Feature.Compliance.Workflow'
  }
}
