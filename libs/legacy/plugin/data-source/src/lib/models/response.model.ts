export class DataSourceResponse<T> {
    count:number;
    result:T[];
}

export class ColumnOption {
    public displayName:string;
    public fieldName:string;
    public isSearchable:boolean;
    public isDisplayColumn:boolean;
    public isRemainingDisplayColumn?: boolean;
    public hideEditColumn?: boolean;
    constructor() {
        this.isSearchable = false;
        this.isRemainingDisplayColumn = false;
    }
}

export class CustomHeader{
    public name:string;
    public value:string;

}
