import { GeneralComment } from "./general-comments.model";

export class Patient {
  id: string;
  facilityId: string;
  roomId: string;
  accountNo: number;
  isActive: boolean;
  patientName: string;
  cds: string; // clinical decision support ( reviewer from vishal team ) => person who will put values for queries
  age: number;
  sex: string;
  healthPlanName: string;
  queryStatus: string;
  queryDate: string;
  los: number;  // length of stay
  financialClass: string; //
  patientClass: string; // In or Out
  mrn: string; // medical record no of patient => patient id v MRN ( might be coming from ERM)
  admissionDate: string;
  reimbursementType: string;
  dischargeDate: string;
  concurrent_postDC: string; //
  secondaryInsurance: string;
  contracted: boolean;
  pdx: string; // priniple diagnosis
  generalComment: GeneralComment;
  followUpComments: GeneralComment[];
  createdBy: string;
  createdTime: string;
  lastUpdatedBy: string;
  lastUpdatedTime: string;
  statusClass: string;
  reviewStatus: string;
}

// EHR / EMR
