import { Injectable } from '@angular/core';
import { QueryConfiguration } from './queryConfiguration';
import { QueryService } from './queryService';

@Injectable({providedIn: 'any'})
export class QueryBuilder {

    constructor( private config: QueryConfiguration) {
    }

    public CreateService<T>(typeName: string, config?: QueryConfiguration): QueryService<T> {
        return new QueryService<T>(typeName, config ? config : this.config);
    }
}
