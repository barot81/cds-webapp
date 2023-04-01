
import { Component, OnInit } from '@angular/core';
import { DrawerAdapter } from '@exxat/ux';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ryzen-tenant-onboarding-edit-columns',
  templateUrl: './tenant-onboarding-edit-columns.component.html',
})
export class TenantOnboardingEditColumnsComponent implements OnInit , DrawerAdapter {

  columnsList = [
    'Institute Name',
    'Institute Short Name',
    'Tenant ID',
    'Time Zone',
    'Progress',
    'Status',
    'Institution Address',
    'Actions'
  ];

  editColumnsForm: FormGroup;
  data: any;
  key: string;
  primaryAction() {
    throw new Error("Method not implemented.");
  }
  secondaryAction() {
    throw new Error("Method not implemented.");
  }

  constructor(private _formBuilder: FormBuilder) {

    this.editColumnsForm = this._formBuilder.group({
      columnControl: [this.columnsList[0]],
    });
  }



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsList, event.previousIndex, event.currentIndex);
  }


  ngOnInit() {
  }

}
