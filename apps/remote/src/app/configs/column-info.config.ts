import { ColumnOption } from "../models/datasource/columnOption.model";

export const PatientGridColInfo: ColumnOption[] = [
  {
    displayName: 'Patient Name',
    fieldName: 'patientName',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Patient #',
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
    displayName: 'Health Plan',
    fieldName: 'healthPlan',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'LOS',
    fieldName: 'los',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Review Status',
    fieldName: 'reviewStatus',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'CDS',
    fieldName: 'cds',
    isSearchable: true,
    isDisplayColumn: true
  },
  {
    displayName: 'Reimbursement Type',
    fieldName: 'reimbursementType',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Drg No - Description',
    fieldName: 'drgNo',
    isSearchable: false,
    isDisplayColumn: true
  },
  {
    displayName: 'Query Date',
    fieldName: 'queryDate',
    isSearchable: false,
    isDisplayColumn: true
  }
]
