import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  dataBucket: string;
  feature: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  noaccess: boolean
}

const ELEMENT_DATA: PeriodicElement[] = [
  { dataBucket: 'Data Bucket 1', feature: 'Student banner, Update student picture', create: true, read: false, update: true, delete: false, noaccess: false },
  { dataBucket: 'Data Bucket 2', feature: 'Academic Information (Except academic standing), Program requirements, Manage program requirements report, Associated staff and faculty', create: false, read: false, update: false, delete: false, noaccess: false },
  { dataBucket: 'Data Bucket 3', feature: 'Academic info (with Academic standing field under status section) + Advisory section: Academic improvement plan-advisor notes-forms/documents + Student grades + Student summary/progress report ', create: false, read: false, update: false, delete: false, noaccess: false },
  { dataBucket: 'Data Bucket 4', feature: 'Student search + Student info/profile (except the Demographic information section ) +contact + Student address report + Student emergency contact report + Language proficiency report + Profile attestation status report + Graphical report for race, gender, age, ethnicity  + Professional interest report + Student info report  (excluding the fields/ columns that are part of the demographic information section which includes information about their race, gender, ethnicity, etc) ', create: false, read: false, update: false, delete: false, noaccess: false },
  { dataBucket: 'Data Bucket 5', feature: 'Student tags + Ability to filter for tags', create: false, read: true, update: true, delete: false, noaccess: false },
  { dataBucket: 'Data Bucket 6', feature: 'Student compliance + Share profile +  include compliance bit while sharing the student profile', create: false, read: true, update: false, delete: false, noaccess: false },
  { dataBucket: 'Data Bucket 7', feature: 'Intervention + Student intervention report', create: true, read: false, update: false, delete: false, noaccess: false },
  { dataBucket: 'Data Bucket 8', feature: 'Student tags + Ability to filter for tags', create: true, read: false, update: false, delete: false, noaccess: true },
  { dataBucket: 'Data Bucket 9', feature: 'Student compliance + Share profile +  include compliance bit while sharing the student profile', create: false, read: false, update: false, delete: false, noaccess: false },
  { dataBucket: 'Data Bucket 10', feature: 'Student tags + Ability to filter for tags ', create: true, read: false, update: false, delete: false, noaccess: false },
];



@Component({
  selector: 'ryzen-static-role-configuration-drawer-demo',
  templateUrl: './static-role-configuration-drawer-demo.component.html',
  styleUrls: ['./static-role-configuration-drawer-demo.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false, showError: true }
}]
})
export class StaticRoleConfigurationDrawerDemoComponent implements OnInit {
  color = 'primary';

  displayedColumns: string[] = ['dataBucket', 'feature', 'create', 'read', 'update', 'delete', 'noaccess'];
    // dataSource = ELEMENT_DATA;
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private _formBuilder: FormBuilder) { }

  role_description = `Short Description about the role............ 
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Sem mauris consectetur vulputate aenean in enim ultrices.
  Odio gravida eget ultricies lacinia ornare elit at nunc.
  Consequat at ullamcorper lacus, vestibulum at lectus egestas.
  Enim, tincidunt dolor amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Sem mauris consectetur vulputate aenean in enim ultrices.
  Odio gravida eget ultricies lacinia ornare elit at nunc.
  Consequat at ullamcorper lacus, vestibulum at lectus egestas.
  Enim, tincidunt dolor amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Sem mauris consectetur vulputate aenean in enim ultrices.
  Odio gravida eget ultricies lacinia ornare elit at nunc.
  Consequat at ullamcorper lacus, vestibulum at lectus egestas.
  Enim, tincidunt dolor amet, Lorem ipsum dolor sit amet, consectetur`;
isLinear = false;
roleInfoFormGroup: FormGroup;
secondFormGroup: FormGroup;

ngOnInit() {
  this.roleInfoFormGroup = this._formBuilder.group({
      role_code_name: ['USC.Steps.Admin', Validators.required],
      role_description: [this.role_description, Validators.required],
  });
  this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
  });
}

}




