export class Finding {
  id: string;
  queryType: string;
  cdsName: string; // p
  queryDate: string;
  queryDiagnosis: string;
  PhysicianName: string;
  clinicalIndicator: string;
  currentDRG: string;
  initialWeight: string;
  gmlos: string; //
  expectedDRG: string;
  expectedWeight: string;
  expectedGMLOS: string;  // geo metric length of stay => length of stay based on DRG ( number ) => expected lenth of stay
  responseDate: string;
  responseType: string;
  responseComment: string;
  followupComment: string;
  revisedDRGNo: string;
  revisedWeight: string;
  revisedGMLOS: string;
  weightDifference: string;
  status: string;
  clinicalSummary: string;
  comments: string;
}
