import { Injectable } from '@angular/core';
import { QueryUtils } from './queryUtils';

export class KeyConfigs {
    public filter = '$filters';
    public select = '$select';
    public search = '$search';
    public count = '$count';
    public expand = '$expand';
    public start = '$Start';
    public pageSize = '$PageSize';
    public columns = '$Columns';
    public includes = '$Includes';
    public sortBy = '$SortBy';


}

@Injectable({providedIn: 'any'})
export class QueryConfiguration {
    public keys: KeyConfigs = new KeyConfigs();
    public getEntitiesUri(typeName: string): string {
        return `/${this.sanitizeTypeName(typeName)}`;
    }

    public getEntityUri(key: any, typeName: string): string {
        return `${this.getEntitiesUri(typeName)}(${QueryUtils.quoteValue(key)})`;
    }

    public handleError(err: any, caught: any): void {
        console.warn('OData error: ', err, caught);
    }

    private sanitizeTypeName(typeName: string): string {
        return typeName.replace(/\/+$/, '').replace(/^\/+/, '');
    }
}
