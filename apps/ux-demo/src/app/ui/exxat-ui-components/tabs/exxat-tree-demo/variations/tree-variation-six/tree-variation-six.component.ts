import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, of as observableOf } from 'rxjs';
import { FileDatabase, FileFlatNode, FileNode } from './file-database.service';

@Component({
  selector: 'zhealthcare-app-tree-variation-six',
  templateUrl: './tree-variation-six.component.html',
})
export class TreeVariationSixComponent {
  activeNode;
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  expandedNodeSet = new Set<string>();
  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;

  constructor(database: FileDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => this.rebuildTreeForData(data));
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type, node.id);
  }
  private _getLevel = (node: FileFlatNode) => node.level;
  private _isExpandable = (node: FileFlatNode) => node.expandable;
  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);
  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  /**
   * This constructs an array of nodes that matches the DOM,
   * and calls rememberExpandedTreeNodes to persist expand state
   */
  visibleNodes(): FileNode[] {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    const result = [];

    function addExpandedChildren(node: FileNode, expanded: Set<string>) {
      result.push(node);
      if (expanded.has(node.id)) {
        node.children.map(child => addExpandedChildren(child, expanded));
      }
    }
    this.dataSource.data.forEach(node => {
      addExpandedChildren(node, this.expandedNodeSet);
    });
    return result;
  }

  /**
   * Handle the drop - here we rearrange the data based on the drop event,
   * then rebuild the tree.
   * */
  drop(event: CdkDragDrop<string[]>) {
    // console.log('origin/destination', event.previousIndex, event.currentIndex);

    // ignore drops outside of the tree
    if (!event.isPointerOverContainer) return;

    // construct a list of visible nodes, this will match the DOM.
    // the cdkDragDrop event.currentIndex jives with visible nodes.
    // it calls rememberExpandedTreeNodes to persist expand state
    const visibleNodes = this.visibleNodes();

    // deep clone the data source so we can mutate it
    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));

    // recursive find function to find siblings of node
    function findNodeSiblings(arr: Array<any>, id: string): Array<any> {
      let result, subResult;
      arr.forEach(item => {
        if (item.id === id) {
          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult) result = subResult;
        }
      });
      return result;
    }

    // remove the node from its old place
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: FileNode = siblings.splice(siblingIndex, 1)[0];

    // determine where to insert the node
    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.id === nodeToInsert.id) return;

    // determine drop index relative to destination array
    let relativeIndex = event.currentIndex; // default if no parent
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(n => nodeAtDest.id === n.id);
    const parent = this.getParentNode(nodeAtDestFlatNode);
    if (parent) {
      const parentIndex = visibleNodes.findIndex(n => n.id === parent.id) + 1;
      relativeIndex = event.currentIndex - parentIndex;
    }
    // insert node
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    if (!newSiblings) return;
    newSiblings.splice(relativeIndex, 0, nodeToInsert);

    // rebuild tree with mutated data
    this.rebuildTreeForData(changedData);
  }

  /**
   * Experimental - opening tree nodes as you drag over them
   */
  dragStart() {
    this.dragging = true;
  }
  dragEnd() {
    this.dragging = false;
  }
  dragHover(node: FileFlatNode) {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => {
        this.treeControl.expand(node);
      }, this.expandDelay);
    }
  }
  dragHoverEnd() {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */

  rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;

    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
  }

  private rememberExpandedTreeNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
          expandedNodeSet.add(node.id);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeId) => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find((n) => n.id === nodeId)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: FileFlatNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) return;
    const idSet = new Set(ids);
    return flatNodes.forEach((node) => {
      if (idSet.has(node.id)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  private getParentNode(node: FileFlatNode): FileFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
