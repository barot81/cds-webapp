export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
  id: string;
  status: string;
  isRestricted: boolean;
}
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  id: string;
  status: string;
  isRestricted: boolean;
  label: string;
}

export const TREE_DATA = {
  'Include compliance documents in the profile link': {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null
  }
}
 // newline at end of file
