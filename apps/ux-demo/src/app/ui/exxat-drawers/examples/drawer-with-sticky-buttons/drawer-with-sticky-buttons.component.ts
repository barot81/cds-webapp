import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { FusionFormComponent, FusionFormAdapter } from '@zhealthcare/fusion/components';
@Component({
  selector: 'zhealthcare-drawer-with-sticky-buttons',
  templateUrl: './drawer-with-sticky-buttons.component.html',
})
export class DrawerWithStickyButtonsComponent extends FusionFormComponent implements OnInit, FusionFormAdapter {
  // form: FormGroup;
  data: any;
  key: string;
  checked = false;
  indeterminate = false;

  chipsArray: string[] = ["One", "Two", "Three"];
  removable = true;
  selectable = true;

  allchips: any[] = [
    { value: 'One', selected: false },
    { value: 'Two', selected: false },
    { value: 'Three', selected: false },
    { value: 'Four', selected: false },
    { value: 'Five', selected: false },
    { value: 'Six', selected: false },
    { value: 'Seven', selected: false },
    { value: 'Eight', selected: false },
    { value: 'Nine', selected: false },
    { value: 'Ten', selected: false }
  ];

  primaryAction() {
    throw new Error("Method not implemented.");
  }
  secondaryAction() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  checkboxList = [
    { value: "male", viewValue: "Male" },
    { value: "female", viewValue: "Female" },
    { value: "other", viewValue: "Other" }
  ];

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {
    super();
    // Reactive Form
    this.fusionFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      checkbox: ['', Validators.required],
      gender: ['', Validators.required],
      ssn: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  panelClose() { }

}
