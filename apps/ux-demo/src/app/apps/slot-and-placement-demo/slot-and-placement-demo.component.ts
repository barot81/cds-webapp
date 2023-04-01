
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { zhealthcareTag, zhealthcareTagOptions, TagEvent } from '@zhealthcare/plugin/tags';
import { BreadCrumbType, FuseSidebarService } from '@zhealthcare/ux';
import { HeaderService } from '@zhealthcare/ux';
import { BehaviorSubject } from 'rxjs';
import { GridService } from '../student-grid/grid.service';

export interface PeriodicElement {
  location: string;
  id: number;
  slots: string;
  placements: string;
  checkbox:string;
  isExpandedContent: boolean
  
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
  selector: 'ryzen-slot-and-placement-demo',
  templateUrl: './slot-and-placement-demo.component.html',
  styleUrls: ['./slot-and-placement-demo.component.scss']
})
export class SlotAndPlacementDemoComponent implements OnInit {

  header_content_height = new BehaviorSubject<number>(0);
  header_content_height$ = this.header_content_height.asObservable();

  @ViewChild('header_content') header_content: ElementRef;
 
  _breadCrumbType = BreadCrumbType;
  breadcrumbs = [
    { title: 'Course offering', route: '', order: 0 },
    { title: 'PT 758 - Clinical Education Experience I (1st CEE)', route: '', order: 1 }
  ];

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

    //tags component

    public tagOptions = new zhealthcareTagOptions();

    tags: Array<zhealthcareTag> = [
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
        this.tags = new Array<zhealthcareTag>();
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

  constructor( private _fuseSidebarService: FuseSidebarService, public headerService: HeaderService,public gridService: GridService) { }

  ngAfterViewInit() {
    setTimeout(async () => {
      await this.headerService.setCurrentHeaderHeight(0);
      await this.setHeaderContentHeight();
    });

  }

  private setHeaderContentHeight(): void {
    if (this.header_content && this.header_content !== null) {
      this.header_content_height.next(
        this.header_content.nativeElement.offsetHeight + 15
      );
    }
  }

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


}


