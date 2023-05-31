import { ColumnOption } from "../models/datasource/columnOption.model";

export const PatientGridColInfo: ColumnOption[] = [
  {
    displayName: 'Patient Name',
    fieldName: 'patientName',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Account No',
    fieldName: 'patientNo',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Room',
    fieldName: 'room',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Admit Date',
    fieldName: 'admitDate',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Discharge Date',
    fieldName: 'dischargeDate',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Health Plan',
    fieldName: 'healthPlan',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'CDS',
    fieldName: 'cds',
    isSearchable: false,
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
    displayName: 'MRN',
    fieldName: 'mrn',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Patient Class',
    fieldName: 'patientClass',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Financial Class',
    fieldName: 'financialClass',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Contracted',
    fieldName: 'contracted',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'LOS',
    fieldName: 'los',
    isSearchable: false,
    isDisplayColumn: true
  }
]
