import { DatasourceDisplayModel } from "./DatasourceDisplayModel";

export const EnrollmentCalendar ='Enrollment Calendar';
export const GraduationCalendar ='Graduation Calendar';

export const PatientSerachColInfo: DatasourceDisplayModel[] = [
  {
    displayName: 'Patient Name',
    fieldName: 'lastName',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Account No',
    fieldName: 'accountNo',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Room',
    fieldName: 'roomId',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Age',
    fieldName: 'age',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Admissioin Date',
    fieldName: 'admissioinDate',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Discharge Date',
    fieldName: 'dischargeDate',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Health Plan',
    fieldName: 'healthPlanName',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'CDS',
    fieldName: 'cds',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Query Status',
    fieldName: 'queryStatus',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Query Date',
    fieldName: 'queryDate',
    isSearchable: false,
    isDisplayColumn: true
  },

  {
    displayName: 'Reimbursement Type',
    fieldName: 'reimbursementType',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Concurrent/PostDC',
    fieldName: 'concurrent_postDC',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Secondary Insurance',
    fieldName: 'secondaryInsurance',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'PDX',
    fieldName: 'pdx',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'MRN',
    fieldName: 'mrn',
    isSearchable: false,
    isDisplayColumn: true
  }
]
