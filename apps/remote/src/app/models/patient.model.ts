import { GeneralComments } from "./general-comments.model";

export class Patient {
  id: string;
  facilityId: string;
  roomId: string;
  accountNo: number;
  isActive: boolean;
  firstName: string;
  lastName: string;
  cds: string; // clinical decision support ( reviewer from vishal team ) => person who will put values for queries
  age: number;
  sex: string;
  healthPlanName: string;
  queryStatus: string;
  los: number;  // length of stay
  financialClass: string; //
  patientClass: string; // In or Out
  mrn: string; // medical record no of patient => patient id v MRN ( might be coming from ERM)
  admissioinDate: string;
  reimbursementType: string;
  dischargeDate: string;
  concurrent_postDC: string; //
  secondaryInsurance: string;
  contracted: boolean;
  pdx: string; // priniple diagnosis
  generalComment: GeneralComments;
  createdBy: string;
  createdTime: string;
  lastUpdatedBy: string;
  lastUpdatedTime: string;
  statusClass: string;
}

// EHR / EMR
