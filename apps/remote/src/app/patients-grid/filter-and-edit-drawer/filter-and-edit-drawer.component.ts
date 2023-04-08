
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

export interface filterListItem {
  id: string;
  title: string;
  count: number;
}

export interface operationListItem {
  id: string;
  title: string;
}

@Component({
  selector: 'ryzen-filter-and-edit-drawer',
  templateUrl: './filter-and-edit-drawer.component.html',
})
export class FilterAndEditDrawerComponent {

  @Input()
  disablePagination: boolean

  operationId: string;
  selectedId: string;
  settingsOption = [
    {name: 'none', color: undefined},
    {name: 'Primary', color: 'primary'},
    {name: 'Accent', color: 'accent'},
    {name: 'Warn', color: 'warn'},
  ];

  operationList: operationListItem[] = [
    { id: 'filter-operation', title: 'Filter' },
    { id: 'edit-operation', title: 'Edit Columns' },
  ]

  filterList: filterListItem[] = [
    { id: 'setting-filter', title: 'Setting', count: 3 },
    { id: 'cohort-filter', title: 'Cohort', count: 3 },
    { id: 'document-type-filter', title: 'Document Type', count: 0 }
  ]

  columnsList = [
    'Student Name',
    'Email',
    'Phone',
    'Practice Setting',
    'Time'
  ];

  remainingDisplayColumns = []

  constructor() {
    this.selectedId = this.filterList[0].id;
    this.operationId = this.operationList[0].id;
  }
  

  navigateToFilterListItem(id: string) {
    this.selectedId = id;
  }

  navigateToOperationListItem(id: string){
    this.operationId = id;
  }

  drop (event: CdkDragDrop<[]>) {
    moveItemInArray(this.columnsList = this.columnsList.slice(), event.previousIndex, event.currentIndex);
  }

  onRemoveColumn(column:any){
    const currentColumnIndex = this.columnsList.findIndex(x=>x === column); 
    this.remainingDisplayColumns.push(this.columnsList[currentColumnIndex]);
    const updatedDisplayColumns = [...this.columnsList];
    updatedDisplayColumns.splice(currentColumnIndex,1);
    this.columnsList = updatedDisplayColumns;
  }

  onAddColumn(column:any) {
    const currentColumnIndex = this.remainingDisplayColumns.findIndex(x=>x === column);
    this.columnsList.push(this.remainingDisplayColumns[currentColumnIndex]);
    const updatedDisplayColumns = [...this.remainingDisplayColumns];
    updatedDisplayColumns.splice(currentColumnIndex,1);
    this.remainingDisplayColumns = updatedDisplayColumns;
  }

}

