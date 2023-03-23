import { QueryConfiguration } from './queryConfiguration';
import { QueryData } from './queryData';


export class QueryService<T> {
    private _entitiesUri: string;

    constructor(private _typeName: string, private config: QueryConfiguration) {
        this._entitiesUri = config.getEntitiesUri(_typeName);
    }

    public get TypeName(): string {
        return this._typeName;
    }

    

    public Query(): QueryData<T> {
        return new QueryData<T>(this.TypeName, this.config);
    }

    protected getEntityUri(key: any): string {
        return this.config.getEntityUri(key, this._typeName);
    }

}
