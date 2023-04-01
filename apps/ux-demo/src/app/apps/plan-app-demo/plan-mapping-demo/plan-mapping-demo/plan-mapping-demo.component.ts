import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FuseSidebarService, HeaderService } from '@zhealthcare/ux';
import { TodoItemFlatNode, TodoItemNode } from '../plan-mapping-tree.service';
import { PlanAppDemoDrawerService } from '../../plan-app-demo-drawer.service';
import { PlanMappingTreeDB } from '../plan-mapping-tree.service';

@Component({
  selector: 'ryzen-plan-mapping-demo',
  templateUrl: './plan-mapping-demo.component.html',
  styleUrls: ['./plan-mapping-demo.component.scss']
})
export class PlanMappingDemoComponent implements AfterViewInit {

  activeNode;
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  selectedParent: TodoItemFlatNode | null = null;
  newItemName = '';
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

  content_text_01 = `7D1. Report to appropriate authorities suspected cases of fraud and abuse related to the
            utilization of and payment for physical therapy and other health care services.`;

  content_text_02 = `7D1. Report to appropriate authorities suspected cases of fraud and abuse related to the
            utilization of and payment for physical therapy and other health care services. 7D1.Report to
            appropriate authorities suspected cases of fraud and abuse related to the utilization of and
            payment for physical therapy and other health care services.`;

  constructor(public _PlanAppDemoDrawerService: PlanAppDemoDrawerService,
    private _PlanMappingTreeDB: PlanMappingTreeDB,
    private _fuseSidebarService: FuseSidebarService,
    public readonly _headerService: HeaderService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this._PlanMappingTreeDB.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  isTextOverflow(elementId: string): boolean {
    const elem = document.getElementById(elementId);
    if (elem) {
      return (elem.offsetHeight < elem.scrollHeight);
    }
    else {
      return false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._headerService.setCurrentHeaderHeight(50);
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
