import { ColumnOption } from "../models/datasource/columnOption.model";

export const PatientGridColInfo: ColumnOption[] = [
  {
    displayName: 'Name',
    fieldName: 'name',
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
    fieldName: 'room',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Admission Date',
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
    fieldName: 'healthPlanName',
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
