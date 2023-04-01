import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Node for to-do item
 */
export class TodoItemNode {
    children: TodoItemNode[];
    item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
    '1 Possess the theoretical and scientific knowledge to perform original research at the basic': {
        '1.1 Possess the theoretical and scientific knowledge to perform original research at the basic': null,
        '1.2 Possess the theoretical and scientific knowledge to perform original research at the basic': null,
        '1.3 Possess the theoretical and scientific knowledge to perform original research at the basic': null,
        '1.4 Possess the theoretical and scientific knowledge to perform original research at the basic': {
            '1.4.1 Possess the theoretical and scientific knowledge to perform original research at the basic': null,
            '1.4.2 Possess the theoretical and scientific knowledge to perform original research at the basic':
                ['1.4.2.1 Possess the theoretical and scientific knowledge to perform original research at the basic', '1.4.2.2 Possess the theoretical and scientific knowledge to perform original research at the basic'],
            '1.4.3 Possess the theoretical and scientific knowledge to perform original research at the basic': null
        }
    },
    '2 Possess the theoretical and scientific knowledge to perform original research at the basic': null,
    '3 Possess the theoretical and scientific knowledge to perform original research at the basic': null,
    '4 Possess the theoretical and scientific knowledge to perform original research at the basic': null,
    '5 Possess the theoretical and scientific knowledge to perform original research at the basic': null,
    '6 Possess the theoretical and scientific knowledge to perform original research at the basic': null
};




@Injectable({providedIn: 'any'})
export class TreeDummyDataService {
    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    get data(): TodoItemNode[] { return this.dataChange.value; }

    constructor() {
        this.initialize();
    }

    initialize() {
        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        //     file node as children.
        const data = this.buildFileTree(TREE_DATA, 0);

        // Notify the change.
        this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
        return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new TodoItemNode();
            node.item = key;

            if (value != null) {
                if (typeof value === 'object') {
                    node.children = this.buildFileTree(value, level + 1);
                } else {
                    node.item = value;
                }
            }

            return accumulator.concat(node);
        }, []);
    }
}
