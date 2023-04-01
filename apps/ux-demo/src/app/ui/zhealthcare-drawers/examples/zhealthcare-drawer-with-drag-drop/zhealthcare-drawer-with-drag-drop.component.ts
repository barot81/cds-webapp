import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DrawerAdapter } from '@zhealthcare/ux';

@Component({
  selector: 'ryzen-zhealthcare-drawer-with-drag-drop',
  templateUrl: './zhealthcare-drawer-with-drag-drop.component.html',
  styleUrls: ['./zhealthcare-drawer-with-drag-drop.component.scss']
})
export class zhealthcareDrawerWithDragDropComponent implements OnInit, DrawerAdapter {
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


  ngOnInit() {
  }

}
