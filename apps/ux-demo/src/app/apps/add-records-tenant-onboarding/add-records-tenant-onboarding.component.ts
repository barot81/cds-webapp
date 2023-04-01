/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/component-selector */
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FuseSidebarService, HeaderService } from '@zhealthcare/ux';
import { BehaviorSubject } from 'rxjs';
import {
  ChecklistDatabase,
  TodoItemFlatNode,
  TodoItemNode,
} from '../../ui/zhealthcare-ui-components/tabs/zhealthcare-tree-demo/variations/tree-data.service';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';
import { PlanAppDemoDrawerService } from '../plan-app-demo/plan-app-demo-drawer.service';
import { StickyTableHeaderLayoutService } from '../sticky-table-header-layout/services/sticky-header-table-layout.service';
import { GridService } from '../student-grid/grid.service';

@Component({
  selector: 'ryzen-add-records-tenant-onboarding',
  templateUrl: './add-records-tenant-onboarding.component.html',
  styleUrls: ['./add-records-tenant-onboarding.component.scss'],
})
export class AddRecordsTenantOnboardingComponent {
  activeNode;
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  selectedParent: TodoItemFlatNode | null = null;
  newItemName = '';
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);
  show = true;

  sidebar_header_height = new BehaviorSubject<number>(0);
  sidebar_header_height$ = this.sidebar_header_height.asObservable();

  @ViewChild('sidebar_header') sidebar_header: ElementRef;
  @ViewChild('container_header') container_header: ElementRef;
  @ViewChild('conditional_content') conditional_content: ElementRef;

  SearchFields = [
    { value: 'Student Name', id: 1 },
    { value: 'Email', id: 2 },
    { value: 'Phone', id: 3 },
    { value: 'Practice Setting', id: 4 },
    { value: 'Time', id: 5 },
  ];

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    public readonly _headerService: HeaderService,
    public readonly _stickyTableHeaderLayoutService: StickyTableHeaderLayoutService,
    public gridService: GridService,
    private _database: ChecklistDatabase,
    public _PlanAppDemoDrawerService: PlanAppDemoDrawerService,
    public _UXDemoDrawerService: UXDemoDrawerService
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    _database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.item === '';

  ngAfterViewInit(): void {
    setTimeout(async () => {
      await this._headerService.setCurrentHeaderHeight(0);
      await this.setSidebarHeaderHeight();
      await this.setContainerHeaderHeight();
      await this.setConditionalContentHeight();
    });
  }

  private setSidebarHeaderHeight(): void {
    if (this.sidebar_header && this.sidebar_header !== null) {
      this.sidebar_header_height.next(
        this.sidebar_header.nativeElement.offsetHeight
      );
    }
  }

  private setContainerHeaderHeight(): void {
    if (this.container_header && this.container_header !== null) {
      this._stickyTableHeaderLayoutService.setContainerHeaderHeight(
        this.container_header.nativeElement.offsetHeight
      );
    }
  }

  private setConditionalContentHeight(): void {
    if (this.conditional_content && this.conditional_content !== null) {
      if (this.show == true) {
        this._stickyTableHeaderLayoutService.setConditionContentHeight(
          this.container_header.nativeElement.offsetHeight + 5
        );
      } else {
        this._stickyTableHeaderLayoutService.setConditionContentHeight(
          this.container_header.nativeElement.offsetHeight
        );
      }
    } else {
      this._stickyTableHeaderLayoutService.setConditionContentHeight(0);
    }
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
}
