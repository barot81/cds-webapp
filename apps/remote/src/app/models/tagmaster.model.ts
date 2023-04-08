type GUID = string & { isGuid: true };

export class TagMaster {
  public id: GUID;
  public title: string;
  public name?:string;
  public colorCode: string;
  public color:string;
  public isChecked: boolean;

}
