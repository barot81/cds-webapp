
type GUID = string & { isGuid: true };

export class Patient {
  public id: GUID;
  public name: string;
  public room: string;
  public admitDate: string;
  public healthPlan: string;
  public cds: string;
  public queryStatus: string;
  public reimbursementType: string;
  public comments: string;
  public queryDate: string;
  public facility: string;
  public statusClass: string;
  public statusClass2: string;
}
