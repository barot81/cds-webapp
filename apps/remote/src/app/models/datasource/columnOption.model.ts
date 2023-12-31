
export class ColumnOption {
  public displayName: string;
  public fieldName: string;
  public isSearchable: boolean;
  public isDisplayColumn: boolean;
  public isRemainingDisplayColumn?: boolean;
  public hideEditColumn?: boolean;
  public defaultInEditColumn?: boolean;
  constructor() {
    this.isSearchable = false;
    this.isRemainingDisplayColumn = false;
  }
}
