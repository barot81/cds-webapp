export interface ExxatTreeNode {
    name: string;
    value?: any;
    isSelected?: boolean;
    children?: ExxatTreeNode[];
}

/** Flat node with expandable and level information */
export interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
    value?: any;
    isSelected?: boolean;
}