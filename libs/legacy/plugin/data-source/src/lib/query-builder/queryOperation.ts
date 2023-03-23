import { HttpParams } from '@angular/common/http';
import { Dictionary, IEnumerable, IQueryable, List } from 'linq-collections';
import { QueryConfiguration } from './queryConfiguration';

export abstract class QueryOperation<T> {
    private _expand: string[] = [];
    private _select: string[] = [];

    constructor(protected typeName: string, protected config: QueryConfiguration) {
    }

    public Expand(expand: string | string[]) {
        if (expand) {
            this._expand = this.toStringArray(expand);
        }
        return this;
    }

    public Select(select: string | string[]) {
        if (select) {
            this._select = this.toStringArray(select);
        }
        return this;
    }

    protected getParams(): HttpParams {
        const expandData = new Dictionary<string, List<string>>();
        const normalSelects = new List<string>();

        this._expand.forEach((name) => expandData.set(name, new List<string>()));

        this._select.forEach((select: string) => {
            const items: string[] = select.split('/');

            // Expand contains string like: `Boss/Name`
            if (items.length > 1) {
                const expandName = items[0];
                const propertyName = items[1];

                if (!expandData.containsKey(expandName)) {
                    expandData.set(expandName, new List<string>());
                }

                expandData.get(expandName).push(propertyName);
            }
            else {
                // Expand is just a simple string like: `Boss`
                normalSelects.push(select);
            }
        });

        let params = new HttpParams();

        const expands = expandData.distinct().select((element) => {
            if (element.value.any()) {
                return `${element.key}(${this.config.keys.select}=${this.toCommaString(element.value)})`;
            }

            return element.key;
        });

        if (expands.any()) {
            params = params.append(this.config.keys.expand, this.toCommaString(expands));
        }

        if (normalSelects.any()) {
            params = params.append(this.config.keys.select, this.toCommaString(normalSelects));
        }

        return params;
    }




    protected toStringArray(input: string | string[] | IEnumerable<string> | IQueryable<string>): string[] {
        if (!input) {
            return [];
        }

        if (input instanceof String || typeof input === 'string') {
            return input.split(',').map(s => s.trim());
        }

        if (input instanceof Array) {
            return input;
        }

        return input.toArray();
    }

    protected toCommaString(input: string | string[] | IEnumerable<string> | IQueryable<string>): string {
        if (input instanceof String || typeof input === 'string') {
            return input as string;
        }

        if (input instanceof Array) {
            return input.join();
        }

        return input.toArray().join();
    }


}

export abstract class OperationWithEntity<T> extends QueryOperation<T> {
    constructor(protected _typeName: string,
        protected config: QueryConfiguration,
        protected entity: T) {
        super(_typeName, config);
    }


}

