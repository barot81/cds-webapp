export interface zhealthcareTreeNode {
    name: string;
    value?: any;
    isSelected?: boolean;
    children?: zhealthcareTreeNode[];
}

/** Flat node with expandable and level information */
export interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
    value?: any;
    isSelected?: boolean;
}
