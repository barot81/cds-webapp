 import { IdentityApiClient } from './../../../identity-api-client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent, EventItem } from '@zhealthcare/fusion/core';
import { Router } from '@angular/router';
import {
  TenantWithOuCodes,
  OuCode,
  FacilityWiseStatuses,
} from '@zhealthcare/fusion/models';
import { MatDialog } from '@angular/material/dialog';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChangePasswordComponent } from '@zhealthcare/ux';
import { AccountNavigtaionService } from '../../../services/account-navigation.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { OrgFacade, UserFacade, AuthSandbox, UIState } from '@zhealthcare/fusion/core';
import { MetaConstants } from '../../../../../../../fusion/core/src/lib/helper/constants';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  Children: TodoItemNode[];
  Name: string;
  Oucode: string;
  children: TodoItemNode[];
  item: any;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  Name: string;
  Level: number;
  Expandable: boolean;
  Oucode: string;
  expandable: any;
  item: string;
  level: number;
}

@Component({
  selector: 'account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss'],
})
export class AccountSettingComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  fullname: string;
  email = '';
  firstName = '';
  lastName = '';
  OUcode = [];
  tenantWithOuCodes: TenantWithOuCodes[] = [];
  studentrole;
  userid;
  userName = '';
  url;
  selectedTenant: any;
  EditOption;
  private _unsubscribe: Subject<any>;
  initials = false;

  ProfileUrl: string = 'assets/users.png';
  displayInitial = '';
  loading = true;
  tanentName: string;

  level = 1;

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(
    true /* multiple */
  );
  constructor(
    private orgFacade: OrgFacade,
    private userFacade: UserFacade,
    private authSandbox: AuthSandbox,

    private router: Router,
    private dialog: MatDialog,
    private identityApiService: IdentityApiClient,
    private accountNavigtaionService: AccountNavigtaionService
  ) {
    super();
    this._unsubscribe = new Subject();

    this.OUcode = JSON.parse(sessionStorage.getItem('Oucodes'));
    this.authSandbox.launch().subscribe((orgCode) => {
      var data = this.buildFileTree(orgCode[0]['value']);
      this.tanentName = orgCode[0]['key'];
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
      this.dataSource.data = data;
      this.dataSource['_flattenedData'].subscribe((data) => {
        this.populateData(this.OUcode, data);
      });
    });
  }

  ngOnInit() {
    this.userFacade.UserState$.pipe(takeUntil(this._unsubscribe)).subscribe(
      (state: any) => {
        if (state) {
          state.user.FirstName == undefined
            ? state.user.firstName
            : state.user.FirstName;
          state.user.LastName == undefined
            ? state.user.lastName
            : state.user.LastName;
          this.firstName = state.user.FirstName;
          this.lastName = state.user.LastName;
          this.email = state.user.Email;
          this.userid = state.user.Id;
          this.userName = state.user.UserName;
          this.studentrole =
            state.user.UserRoles?.filter((x) => x.RoleCode.includes('Student'))
              .length > 0
              ? true
              : false;
          this.displayInitial = this.CreateInitials();
          this.identityApiService.ProfilePictureSubject.subscribe((data) => {
            let result: any = data;
            if (result.ProfileUrl) {
              this.ProfileUrl = result.ProfileUrl;
              this.initials = false;
              this.loading = false;
            } else {
              this.ProfileUrl = this.CreateInitials();
              this.initials = true;
              this.loading = false;
            }
          });
        }
      }
    );
  }
  getLevel = (node: TodoItemFlatNode) => node.Level;

  isExpandable = (node: TodoItemFlatNode) => node.Expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.Children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.Expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.Name === '';

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(data): TodoItemNode[] {
    if (Array.isArray(data)) {
      data.forEach((element, index) => {
        const node = new TodoItemNode();
        node.Name = element['Name'];
        node.Oucode = element['Oucode'];
        if (
          element.hasOwnProperty('Children') &&
          element['Children'].length > 0
        ) {
          node.Children = element['Children'];
          this.buildFileTree(element['Children']);
        }
        data[index] = node;
      });
    }

    return data;
  }

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, Level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.Name === node.Name
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.Name = node.Name;
    flatNode.Oucode = node.Oucode;
    flatNode.Level = Level;
    flatNode.Expandable = !!node.Children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);

    return flatNode;
  };

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);

    return descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    this.updateTanentData();
  }

  todoItemSelectionToggleUpdate(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    this.updateTanentData();
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }
  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
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

  signOut() {
    this.userFacade.LogOut();
    localStorage.removeItem('StudentId');
    localStorage.clear();
    this.router.navigateByUrl('/account/login');
  }

  updateTanentData(): void {
    // const statusCount = JSON.parse(localStorage.getItem('StatusCounts'));

    // const updatedStatusCount = this.updateData(statusCount, this.checklistSelection.selected);

    // const facilityId = localStorage.getItem(MetaConstants.FACILITYID);
    // const a = new FacilityWiseStatuses(facilityId, updatedStatusCount);

    // this.orgFacade.UpdateFacilityWiseStatuses(a);

    // Refresh current component

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    const currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }

  updateData(alltalent, selected) {
    if (Array.isArray(alltalent)) {
      alltalent.forEach((element, index) => {
        if (element.hasOwnProperty('Children')) {
          const checkSelected = selected.filter(function (res) {
            return res.Oucode === element['Oucode'];
          });
          if (checkSelected.length > 0) alltalent[index]['isSelected'] = true;
          else alltalent[index]['isSelected'] = false;
          this.updateData(element.Children, selected);
        }
      });
    } else {
      const checkSelected = selected.filter(function (res) {
        return res.Oucode === alltalent['Oucode'];
      });

      if (checkSelected.length > 0) alltalent['isSelected'] = true;
      else alltalent['isSelected'] = false;
      this.updateData(alltalent.Children, selected);
    }
    return alltalent;
  }

  populateData(alltalent, selected) {
    if (Array.isArray(alltalent)) {
      alltalent.forEach((element, index) => {
        if (element.hasOwnProperty('Children')) {
          const checkSelected = selected.filter(function (res) {
            return res.Oucode === element['Oucode'];
          });

          if (
            checkSelected.length > 0 &&
            !this.checklistSelection.isSelected(checkSelected[0]) &&
            element['isSelected']
          ) {
            if (checkSelected[0]['Expandable'])
              this.todoItemSelectionToggleUpdate(checkSelected[0]);
            else this.checklistSelection.toggle(checkSelected[0]);
          }
          this.populateData(element.Children, selected);
        }
      });
    } else {
      const checkSelected = selected.filter(function (res) {
        return res.Oucode === alltalent['Oucode'];
      });

      if (checkSelected[0]['Expandable'])
        this.todoItemSelectionToggleUpdate(checkSelected[0]);
      else this.checklistSelection.toggle(checkSelected[0]);

      this.populateData(alltalent.Children, selected);
    }
    return alltalent;
  }

  onTenantChange(tenant, item) {
    if (item) {
      if (item.isSelected) {
        item.isSelected = false;
      } else {
        item.isSelected = true;
      }
    }

    // Refresh current component

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    let currentUrl = this.router.url + '?';
    this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
  }
  openDialog() {
    this.dialog.open(TermsOfUseComponent);
  }

  CreateInitials() {
    if (!this.firstName && !this.lastName) {
      return;
    }
    if ((this.firstName == null && this.lastName !== null) || undefined) {
      this.fullname = this.lastName;
      return this.fullname[0];
    }
    if ((this.firstName !== null && this.lastName == null) || undefined) {
      this.fullname = this.firstName;
      return this.fullname[0];
    }
    if ((this.firstName !== null && this.lastName !== null) || undefined) {
      this.fullname = this.lastName + ', ' + this.firstName;
      let nameArray = this.fullname.split(' ');
      if (nameArray.length > 1) {
        return (
          nameArray[0].substring(0, 1).toUpperCase() +
          nameArray[nameArray.length - 1].substring(0, 1).toUpperCase()
        );
      }
    }
  }

  changePassword() {
    this.accountNavigtaionService.cachedComponent = AccountSettingComponent;
    const uiState = new UIState(ChangePasswordComponent, this.userName);
    const eventItem: EventItem = { payload: uiState };
    this.updateRefArea(eventItem);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
