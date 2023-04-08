import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItemNode } from './note-tree.model';


@Injectable({providedIn: 'any'})
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  docData = new BehaviorSubject<any>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initializeData();
  }

  initializeData() {
    this.docData.subscribe(x => {
      const data = this.buildFileTree(x, 0);
      this.dataChange.next(data);
    })
  }

  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((acc, key) => {
      const val = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (val != null) {
        if (typeof val === 'object') {
          node.children = this.buildFileTree(val, level + 1);
        } else {
          node.item = val;
        }
      }

      return acc.concat(node);
    }, []);
  }
}
