import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  FusionFormAdapter,
  FusionFormComponent,
} from '@zhealthcare/fusion/components';
import {
  DrawerAdapter,
  DrawerService,
  ManifoldPanelService,
} from '@zhealthcare/ux';
import { BehaviorSubject } from 'rxjs';
import { PatientSerachColInfo } from '../../models/patient-search.model';
import { ColumnOption } from '../../models/response.model';
import { PatientGridService } from '../../services/patients-grid.service';

@Component({
  selector: 'zhc-display-columns-form',
  templateUrl: './edit-columns.component.html',
})
export class EditColumnsComponent
  extends FusionFormComponent
  implements DrawerAdapter, AfterViewInit, FusionFormAdapter
{
  displayColumns: ColumnOption[] = [];
  remainingDisplayColumns: ColumnOption[] = [];
  hiddenColumns: ColumnOption[] = [];
  editColumnsForm: FormGroup;
  data: any;
  key: string;
  removeColumnFlag = false;
  isValid?: BehaviorSubject<boolean>;

  constructor(
    private _formBuilder: FormBuilder,
    private readonly fb: FormBuilder,
    public drawerService: DrawerService,
    public manifoldPanelService: ManifoldPanelService,
    public patientGridService: PatientGridService
  ) {
    super();

    this.fusionFormGroup = this.fb.group({});
    this.displayColumns = PatientSerachColInfo;
    this.fusionFormGroup = this._formBuilder.group({
      columnControl: [this.displayColumns[0]],
    });
    this.hiddenColumns = this.displayColumns.filter((ele) => {
      return ele.hideEditColumn == true;
    });
  }
  panelClose() {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.drawerService.setPrimaryActionState(false, false);
  }

  primaryAction() {
    this.manifoldPanelService.closeCurrentManifoldPanel();
    this.patientGridService.updateEditColumns(this.displayColumns);

  }

  secondaryAction() {
    // throw new Error('Method not implemented.');
  }

  drop(event: CdkDragDrop<ColumnOption[]>) {
    this.drawerService.setPrimaryActionState(this.fusionFormGroup.valid, false);
    moveItemInArray(
      (this.displayColumns = this.displayColumns.slice()),
      event.previousIndex,
      event.currentIndex
    );
  }

  onRemoveColumn(column: ColumnOption) {
    if (this.displayColumns.length - this.hiddenColumns.length > 1) {
      const currentColumnIndex = this.displayColumns.findIndex(
        (x) => x.fieldName === column.fieldName
      );
      this.remainingDisplayColumns.push(
        this.displayColumns[currentColumnIndex]
      );
      const updatedDisplayColumns = [...this.displayColumns];
      updatedDisplayColumns.splice(currentColumnIndex, 1);
      this.displayColumns = updatedDisplayColumns;
      this.drawerService.setPrimaryActionState(
        this.fusionFormGroup.valid,
        false
      );
    } else {
      this.removeColumnFlag = true;
    }
  }

  onAddColumn(column: ColumnOption) {
    const currentColumnIndex = this.remainingDisplayColumns.findIndex(
      (x) => x.fieldName === column.fieldName
    );
    this.displayColumns.push(this.remainingDisplayColumns[currentColumnIndex]);
    if (this.displayColumns.length - this.hiddenColumns.length > 1) {
      this.removeColumnFlag = false;
    }
    const updatedDisplayColumns = [...this.remainingDisplayColumns];
    updatedDisplayColumns.splice(currentColumnIndex, 1);
    this.remainingDisplayColumns = updatedDisplayColumns;
    this.drawerService.setPrimaryActionState(this.fusionFormGroup.valid, false);
  }
}
