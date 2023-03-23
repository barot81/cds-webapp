import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { zhealthcareTreeNode, FlatNode } from './models/zhealthcareTreeFlatNode.model';

@Component({
  selector: 'zhealthcare-tree',
  templateUrl: './zhealthcare-tree.component.html',
  styleUrls: ['./zhealthcare-tree.component.scss']
})
export class ZhealthcareTreeComponent implements OnInit {

  public _selectedNode: zhealthcareTreeNode;

  @Input() dataSource;

  @Output() onNodeClick: EventEmitter<zhealthcareTreeNode> = new EventEmitter<zhealthcareTreeNode>();

  private transformer = (node: zhealthcareTreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      isSelected: node.isSelected,
      value: node.value
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  TREE_DATA = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {

  }
  ngOnInit(): void {
    this.TREE_DATA.data = this.dataSource;
    const nodeIndex = this.treeControl.dataNodes.findIndex
      (x => x.isSelected === true);
    if (nodeIndex) {
      const node = this.treeControl.dataNodes[nodeIndex] as zhealthcareTreeNode;
      this.expandParents(node);
      this._selectedNode = node;
      this.nodeClick(node);
    }

  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  nodeClick(node: zhealthcareTreeNode) {
    this._selectedNode = node;
    this.onNodeClick.emit(node);
  }

  expandParents(node: any) {
    const currentLevel = this.treeControl.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.treeControl.getLevel(currentNode) < currentLevel) {
        this.treeControl.expand(currentNode);
        if (this.treeControl.getLevel(currentNode) === 0) break;
      }
    }
  }
}
