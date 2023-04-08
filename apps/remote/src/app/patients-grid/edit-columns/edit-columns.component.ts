import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DrawerAdapter } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-edit-columns',
  templateUrl: './edit-columns.component.html',
})
export class EditColumnsComponent implements DrawerAdapter {

  columnsList = [
    'Student Name',
    'Email',
    'Phone',
    'Practice Setting',
    'Time'
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

}
