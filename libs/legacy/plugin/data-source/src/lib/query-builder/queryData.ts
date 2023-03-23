import { HttpParams } from '@angular/common/http';
import { QueryConfiguration } from './queryConfiguration';
import { ExecReturnType } from './queryEnum';
import { QueryOperation } from './queryOperation';


export class QueryData<T> extends QueryOperation<T> {

    private _filter: string;
    private _search: string;
    private _entitiesUri: string;
    private _page: number;
    private _pageSize: number;
    private _columns:string[] = [];
    private _includes:string[] = [];
    private _sortBy: string;

    constructor(typeName: string, config: QueryConfiguration) {
        super(typeName, config);
        this._entitiesUri = config.getEntitiesUri(this.typeName);
    }

    public Filter(filter: string): QueryData<T> {
        if (filter) {
            this._filter = filter;
        }
        return this;
    }

    public Includes (filter:string[]): QueryData<T> {
        if (filter) {
            this._includes = filter;
        }
        return this;
    }

    public Start (filter: number): QueryData<T> {
        if (filter) {
            this._page = filter;
        }
        return this;
    }

    public PageSize (filter: number): QueryData<T> {
        if (filter) {
            this._pageSize = filter;
        }
        return this;
    }

    public Columns (filter:string[]): QueryData<T> {
        if (filter) {
            this._columns = filter;
        }
        return this;
    }

    public Search(search: string): QueryData<T> {
        if (search) {
            this._search = search;
        }
        return this;
    }

    public SortBy(filter: string): QueryData<T> {
        if (filter) {
            this._sortBy = filter;
        }
        return this;
    }

    public GetUrl(returnType?: ExecReturnType): string {
        let url: string = this._entitiesUri;
        if (returnType === ExecReturnType.Count) {
            url = `/${this.config.keys.count}`;
        }

        const params: HttpParams = this.getQueryParams(returnType === ExecReturnType.PagedResult);
        if (params.keys().length > 0) {
            return `${params}`;
        }

        return url;
    }

    

    private getQueryParams(odata4: boolean): HttpParams {
        let params = super.getParams();

        if (this._filter) {
            params = params.append(this.config.keys.filter, this._filter);
        }

        if (this._search) {
            params = params.append(this.config.keys.search, this._search);
        }

        if (odata4) {
            params = params.append('$count', 'true'); // OData v4 only
        }
        
        if (this._page) {
            params = params.append(this.config.keys.start, this._page.toString());
        }

        if (this._pageSize) {
            params = params.append(this.config.keys.pageSize, this._pageSize.toString());
        }

        if (this._columns.length > 0) {
            params = params.append(this.config.keys.columns, this.toCommaString(this._columns));
        }

        
        if (this._sortBy) {
            params = params.append(this.config.keys.sortBy, this._sortBy);
        }

        if (this._includes.length > 0) {
            params = params.append(this.config.keys.includes, this.toCommaString(this._includes));
        }

        return params;
    }

    
}
