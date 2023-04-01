import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FuseSidebarService, ScrollSpyService } from '@zhealthcare/ux';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { CancelRequestPopupComponent } from '../../cancel-request-popup/cancel-request-popup.component';
import{UXDemoDrawerService} from '../../../../remote-entry/ux-demo-drawer.service';

//#region [ Example Tree Data And Models]

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  id: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Basic Information', id: 'scroll_spy_list_item_0'
  },
  {
    name: 'I. Fundamental of Practice',
    id: 'scroll_spy_list_item_1',
    children: [
      { name: 'Practice I', id: 'scroll_spy_list_item_2' },
      { name: 'Practice II', id: 'scroll_spy_list_item_3' },
    ]
  },
  {
    name: 'II. Basic Tenets', id: 'scroll_spy_list_item_4'
  },
  {
    name: 'III. Evaluation and Screening', id: 'scroll_spy_list_item_5'
  },
  {
    name: 'IV. Intervention',
    id: 'scroll_spy_list_item_6',
    children: [
      { name: 'Practice I', id: 'scroll_spy_list_item_7' },
      { name: 'Practice II', id: 'scroll_spy_list_item_8' },
    ]
  },
  {
    name: 'V. Management of Occupational Therapy Service', id: 'scroll_spy_list_item_9'
  },
  {
    name: 'VI. Communication', id: 'scroll_spy_list_item_10'
  },
  {
    name: 'VII. Professional Behaviors',
    id: 'scroll_spy_list_item_11',
    children: [
      { name: 'Practice I', id: 'scroll_spy_list_item_12' },
      { name: 'Practice II', id: 'scroll_spy_list_item_13' },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: string;
  level: number;
}

//#endregion
@Component({
  selector: 'ryzen-component-level-scroll-example',
  templateUrl: './component-level-scroll-example.component.html',
  styleUrls: ['./component-level-scroll-example.component.scss']
})
export class ComponentLevelScrollExampleComponent implements AfterViewInit {
  activeNode;
  @ViewChild('scrollSpyHeader') scrollSpyHeader: ElementRef;

  public scrollSpyHeaderHeight: number;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor(public dialog: MatDialog,private _fuseSidebarService: FuseSidebarService, public _scrollSpyService: ScrollSpyService, public _UXDemoDrawerService: UXDemoDrawerService) {
    this.dataSource.data = TREE_DATA;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollSpyHeaderHeight = (this.scrollSpyHeader.nativeElement.offsetHeight) + 80;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CancelRequestPopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

  changeNavMenuItem(id: string) {
    this._scrollSpyService.setSelectedScrollSpyListItem(id);
  }
}
