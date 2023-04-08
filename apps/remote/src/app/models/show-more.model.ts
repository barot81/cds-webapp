import { Filter, Item } from "@zhealthcare/plugin/data-source";

export class ShowMore implements Filter {
    fieldName: string;
    operator: string;
    value: string;
    items?: Item[];
    displayName?: string;
    type?: "dropdown" | "search";
    hasSingleValue: boolean
    filterValue: Map<any, any>;

    constructor() {
        this.filterValue = new Map();
    }
}

