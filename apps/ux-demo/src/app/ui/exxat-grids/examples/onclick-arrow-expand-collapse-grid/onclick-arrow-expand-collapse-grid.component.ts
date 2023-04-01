
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExxatTag, ExxatTagOptions, TagEvent } from '@exxat/plugin/tags';
import {  FullScreenService, FuseSidebarService } from '@exxat/ux';
import { HeaderService } from '@exxat/ux';
import { FormControl } from '@angular/forms';
import { UXDemoDrawerService } from '../../../../remote-entry/ux-demo-drawer.service';
import { GridService } from '../../../../apps/student-grid/grid.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';


export interface PeriodicElement {
  location: string;
  id: number;
  slots: string;
  placements: string;
  checkbox:string;
  isExpandedContent: boolean; 
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 0, location: '', slots: '', placements: '',checkbox:'' , isExpandedContent: false}, 
  { id: 1, location: '', slots: '', placements: '',checkbox:'' , isExpandedContent: false},
  { id: 2, location: '', slots: '', placements: '',checkbox:'' , isExpandedContent: false}, 
  { id: 3, location: '', slots: '', placements: '',checkbox:'' , isExpandedContent: false},
  { id: 4, location: '', slots: '', placements: '',checkbox:'' , isExpandedContent: false}, 
  { id: 5, location: '', slots: '', placements: '',checkbox:'', isExpandedContent: false },
  { id: 6, location: '', slots: '', placements: '',checkbox:'', isExpandedContent: false }, 
  { id: 7, location: '', slots: '', placements: '',checkbox:'', isExpandedContent: false },
  { id: 8, location: '', slots: '', placements: '',checkbox:'' , isExpandedContent: false}, 
  { id: 9, location: '', slots: '', placements: '',checkbox:'' , isExpandedContent: false},
  { id: 10, location: '', slots: '', placements: '',checkbox:'', isExpandedContent: false }, 
  { id: 11, location: '', slots: '', placements: '',checkbox:'' , isExpandedContent: false},
];
@Component({
  selector: 'ryzen-onclick-arrow-expand-collapse-grid',
  templateUrl: './onclick-arrow-expand-collapse-grid.component.html',
  styleUrls: ['./onclick-arrow-expand-collapse-grid.component.scss']
})
export class OnclickArrowExpandCollapseGridComponent implements OnInit {

  rows = [];
  tooltipOptions = {
    'contentType': 'template',
    'placement': 'right',
    'trigger': 'click',
    'theme': 'light',
    'max-width': '450',
    'width': '450',
    'hide-delay': -1,
    'pointerEvents': 'auto'
  }

  selection = new SelectionModel<PeriodicElement>(true, []);
  selectedValue: string;

  fixedSettledHeight: number = 135;
  fullScreenMode: boolean = false;
  @ViewChild('header') elementView: ElementRef;
  searchItem = new FormControl();
  //tags component

    public tagOptions = new ExxatTagOptions();

    tags: Array<ExxatTag> = [
      { id: Math.random(), name: 'Tag Label 1 Bigger Text', color: 'indigo-500', isChecked: true },
      { id: Math.random(), name: 'Tag Label 2', color: 'deep-orange-500', isChecked: true },
      { id: Math.random(), name: 'Tag Label 3', color: 'pink-500', isChecked: false },
      { id: Math.random(), name: 'Tag Label 4 Bigger Text', color: 'blue-500', isChecked: true },
      { id: Math.random(), name: 'Tag Label 5', color: 'gray-500', isChecked: true },
      { id: Math.random(), name: 'Tag Label 6', color: 'purple-500', isChecked: false },
      { id: Math.random(), name: 'Tag Label 7 Bigger Text', color: 'yellow-500', isChecked: true },
      { id: Math.random(), name: 'Tag Label 8', color: 'green-500', isChecked: false },
      { id: Math.random(), name: 'Tag Label 9', color: 'pink-500', isChecked: false },
      { id: Math.random(), name: 'Tag Label 10 Bigger Text', color: 'indigo-500', isChecked: true }
    ];
  
    @Output() menuOpened: EventEmitter<void>;

    onTagChanges(event: TagEvent) {
      if (event.eventType.toLowerCase() === 'change') {
        this.tags = new Array<ExxatTag>();
        Object.assign(this.tags, event.tags);
      }
    }
  
//sidebar nested options
    isExpanded = true;
    showSubmenu: boolean = false;
    isShowing = false;
    showSubSubMenu: boolean = false;
    mouseenter() {
      if (!this.isExpanded) {
        this.isShowing = true;
      }
    }
  
    mouseleave() {
      if (!this.isExpanded) {
        this.isShowing = false;
      }
    }

    //grid
    displayedColumns: string[] = ['id', 'checkbox', 'location', 'slots', 'placements'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    clickedRows = new Set<PeriodicElement>();
    highlightedRows = new Set<PeriodicElement>();

  constructor( private _fuseSidebarService: FuseSidebarService, 
    public headerService: HeaderService,
    public gridService: GridService,private elem: ElementRef,
    public _UXDemoDrawerService: UXDemoDrawerService,
    public _fullScreenService: FullScreenService) { }
  
   //code for outside table click event
   clicked: string = '';
   @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (!this.elem.nativeElement.querySelector('#expand-collapse-grid').contains(event.target)){
      if(this.clickedRows.size){
        this.highlightedRows = this.clickedRows;
      }
      this.clickedRows=new Set<PeriodicElement>();
    }
  }
  //end of code for outside table click event

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  // initiateRows(): Observable<Element[]> {
  //   this.dataSource.data.forEach((element) => {
  //     this.rows.push(element, { detailRow: true, element });
  //   });
  //   return of(this.rows);
  // }

  //hide and show content
  expandCollapse(element) {
    element.isExpandedContent = !element.isExpandedContent;
  }

  ngOnInit() {
  }
 // toogle sidebar in small screens
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

    toggleSidebarFolded(): void
    {
        this._fuseSidebarService.getSidebar('carded-left-sidebar-tabbed-2').toggleFold();
    }

    showTestAlert() {
      alert('test button clicked');
      document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
          this.headerService.setCurrentHeaderHeight(this.fixedSettledHeight);
          this.fullScreenMode = true;
          this._fullScreenService.setFullScreenModeEnabled(true);
        } else {
          this.fullScreenMode = false;
          this.setGridHeight();
          this._fullScreenService.setFullScreenModeEnabled(false);
        }
      }
      );
    }
  
    ngAfterViewInit() {
      this.setGridHeight();
      setTimeout(() => {
        this.headerService.setCurrentHeaderHeight(0);
      });
    }

  //#endregion
  setGridHeight(): void {
    setTimeout(() => {
      let height = this.elementView.nativeElement.offsetHeight + this.fixedSettledHeight;
      this.headerService.setCurrentHeaderHeight(height);
    });
  }

}
