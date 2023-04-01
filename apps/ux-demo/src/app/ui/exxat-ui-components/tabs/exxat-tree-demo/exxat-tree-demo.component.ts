import { Component } from '@angular/core';
import { ExxatTreeNode } from '@exxat/ux';

@Component({
  selector: 'ryzen-exxat-tree-demo',
  templateUrl: './exxat-tree-demo.component.html',
  styleUrls: ['./exxat-tree-demo.component.scss']
})
export class ExxatTreeDemoComponent {

  selectedNode: ExxatTreeNode;

  dataSource: ExxatTreeNode[] = [
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

  onNodeClick(node: ExxatTreeNode) {
    this.selectedNode = node;
  }
}
