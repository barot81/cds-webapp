import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataSourceFacade } from '../../store/facades/datasource.facade';
import { Item } from '../../models/Fusion-data-source.model';


@Component({
  selector: 'zhealthcare-dropdown-filter',
  templateUrl: './zhealthcare-dropdown-filter.component.html'
})
export class zhealthcareDropdownFilterComponent implements OnInit,OnChanges {

  @Input() Items:Item[];
  @Input() isMultiple: boolean;
  @Input() label: string;
  @Input() for:string;
  @Input() selected?:string='';
  @Output() messageToEmit = new EventEmitter<boolean>();

  formControl:FormControl;
  dropDownFilterItems$;
  constructor(private dataSourceFacade:DataSourceFacade) {
    this.formControl = new FormControl();
    this.selected='';
  }


  ngOnInit() {
    this.formControl.setValue(this.selected);
    this.dropDownFilterItems$ = this.dataSourceFacade.dropDownFilterItems$(this.for);
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if(changes['Items']?.currentValue?.length > 0 && this.for != undefined)
    {
      this.dataSourceFacade.updateDataSourceFilter({
        fieldName:this.for,
        operator:'contains',
        value:'',
        items:this.Items
      });
    }
  }

  OnSelectionChange($event){
    this.dataSourceFacade.updateDataSourceFilter({
      fieldName:this.for,
      operator:'contains',
      value:$event.value,
      items:this.Items
    });
    this.sendMessageToParent(true);
  }
  sendMessageToParent(value) {
    this.messageToEmit.emit(value)
  }
}
