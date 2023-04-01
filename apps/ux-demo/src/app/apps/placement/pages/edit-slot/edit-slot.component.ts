import { Component, OnInit } from '@angular/core';
import { DrawerAdapter } from '@zhealthcare/ux';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ryzen-edit-slot',
  templateUrl: './edit-slot.component.html',
  styleUrls: ['./edit-slot.component.scss']
})
export class EditSlotComponent implements OnInit, DrawerAdapter {
  editSlotForm: FormGroup;

  slotList = [{ title: 'Slot 1' },
  { title: 'Slot 2' },
  { title: 'Slot 3' }];
  
  data: any;
  key: string;
  isValid?: import("rxjs").BehaviorSubject<boolean>;
  primaryAction() {
    throw new Error("Method not implemented.");
  }
  secondaryAction() {
    throw new Error("Method not implemented.");
  }

  locationList = [{ viewName: 'Orlado', value: 'orlado' },
  { viewName: 'Brazil', value: 'brazil' }];

  settingList = [
    { viewName: 'FM', value: 'fm' },
    { viewName: 'WH', value: 'wh' }
  ];

  rotationList = [
    { viewName: 'Rotation 1', value: 'rotation1' },
    { viewName: 'Rotation 2', value: 'rotation2' }
  ];

  slotTypeList = [
    { viewName: 'Active', value: 'value' },
    { viewName: 'DeActive', value: 'deactive' }
  ];

  superVisionTypeList = [
    { viewName: '2 Student: 2 C1', value: '2student2c1' },
    { viewName: '3 Student: 3 C1', value: '3student3c1' }
  ];

  constructor(private _formBuilder: FormBuilder) {
    this.editSlotForm = this._formBuilder.group({
      location: [this.locationList[0].value],
      setting: [this.settingList[0].value],
      rotation: [this.rotationList[0].value],
      slotType: [this.slotTypeList[0].value],
      superVisionType: [this.superVisionTypeList[0].value],
    })
  }

  ngOnInit() {
  }

}
