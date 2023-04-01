import { Component } from '@angular/core';
import { zhealthcareTreeNode } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-zhealthcare-tree-demo',
  templateUrl: './zhealthcare-tree-demo.component.html',
  styleUrls: ['./zhealthcare-tree-demo.component.scss']
})
export class zhealthcareTreeDemoComponent {

  selectedNode: zhealthcareTreeNode;

  dataSource: zhealthcareTreeNode[] = [
    {
      name: 'Fruit',
      value: 'Fruit',
      children: [
        { name: 'Apple', value: 'Apple', isSelected: true },
        { name: 'Banana', value: 'Banana' },
        { name: 'Fruit loops', value: 'Fruit loops' },
      ]
    }, {
      name: 'Vegetables',
      value: 'Vegetables',
      children: [
        {
          name: 'Green',
          value: 'Green',
          children: [
            { name: 'Broccoli', value: 'Broccoli' },
            { name: 'Brussels sprouts', value: 'Brussels sprouts' },
          ]
        }, {
          name: 'Orange',
          value: 'Orange',
          children: [
            { name: 'Pumpkins', value: 'Pumpkins' },
            { name: 'Carrots', value: 'Carrots' },
          ]
        },
      ]
    },
  ];


  constructor() {
  }

  onNodeClick(node: zhealthcareTreeNode) {
    this.selectedNode = node;
  }
}
