import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FusionFormComponent } from '@zhealthcare/fusion/components';
import { DrawerAdapter, DrawerService, ManifoldPanelService } from '@zhealthcare/ux';
import { ColumnOption } from '../../models/response.model';
import { PatientGridColInfo } from '../column-info.config';

@Component({
  selector: 'zhealthcare-display-columns-form',
  templateUrl: './edit-columns.component.html',
})
export class EditColumnsComponent
  extends FusionFormComponent
  implements DrawerAdapter, AfterViewInit
{
  displayColumns: ColumnOption[] = [];
  remainingDisplayColumns: ColumnOption[] = [];
  hiddenColumns: ColumnOption[] = [];
  editColumnsForm: FormGroup;
  data: any;
  key: string;
  removeColumnFlag = false;

  constructor(
    private _formBuilder: FormBuilder,
    public drawerService: DrawerService,
    public manifoldPanelService: ManifoldPanelService
  ) {
    super();
        this.displayColumns = PatientGridColInfo;
        this.fusionFormGroup = this._formBuilder.group({
          columnControl: [this.displayColumns[0]]
        });
    this.hiddenColumns = this.displayColumns.filter((ele) => {
      return ele.hideEditColumn == true;
    });
  }

  ngAfterViewInit(): void {
    this.drawerService.setPrimaryActionState(false, false);
  }

  primaryAction() {
    this.manifoldPanelService.closeCurrentManifoldPanel();

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
