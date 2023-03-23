import { ColumnOption } from './response.model';

export interface Item {
  value: string;
  viewName: string;
}

export interface Filter {
  fieldName: string;
  operator: string;
  value: string;
  items?: Item[];
  displayName?: string;
  type?: 'dropdown' | 'search';
  parmName?: string;

}

export interface Sort {
  columnName: string;
  direction: string;
  customFieldParm?: {
    sortByFieldName?: string;
    sortDirectionFieldName?: string;
  };
}

export class Pagination {
  startIndex: number;
  pageSize: number;
  customFieldParm?: {
    startIndexFieldName: string;
    pageSizeFieldName: string;
  };
}

export class FusionDataSource {
  filters: Filter[];
  sort: Sort;
  loading: boolean;
  pagination: Pagination;
  total: number;
  displayColumns: ColumnOption[];
  remainingDisplayColumns: ColumnOption[];
  selectedItem: any;
  data: any;
  endPoint: string;
  requestType: string;
  multiColumnSearch: string[];
  filterQueryparmByFieldName?: boolean;
  overRideDefaultHeader?: boolean;
  customHeaders?: any;
  constructor() { }
}
export class PayloadFilter {
  name: string;
  value: string;
  condition: string;
  operatorType: string;
  constructor(name, value, condition) {
    this.operatorType = "And"
    this.name = name
    this.condition = condition
    this.value = value
  }
}
export class RequestPayload {
  filters: Array<PayloadFilter>;
  sortBy: any;
  start: any;
  pageSize: any;
  columns: any;
  multiColumnSearch: string[];
  constructor() {
    this.filters = [];
  }
}
