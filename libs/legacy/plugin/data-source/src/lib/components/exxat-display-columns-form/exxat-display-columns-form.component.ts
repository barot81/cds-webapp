import { AfterViewInit, Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DrawerAdapter, DrawerService } from '@exxat/ux';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataSourceFacade } from '../../store/facades/datasource.facade';
import { FusionFormComponent } from '@exxat/fusion/components';
import { ColumnOption } from '../../models/response.model';

@Component({
  selector: 'exxat-display-columns-form',
  templateUrl: './exxat-display-columns-form.component.html',
})
export class ExxatDisplayColumnsFormComponent
  extends FusionFormComponent
  implements DrawerAdapter, AfterViewInit
{
  displayColumns: ColumnOption[] = [];
  remainingDisplayColumns: ColumnOption[] = [];
  hiddenColumns: ColumnOption[] = [];
  editColumnsForm: FormGroup;
  data: any;
  key: string;
  removeColumnFlag: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    public dataSourceFacade: DataSourceFacade,
    public drawerService: DrawerService
  ) {
    super();
    this.dataSourceFacade.dataSourceDisplayColumns$
      .subscribe((x) => {
        this.displayColumns = [...x.displayColumns] || [];
        this.remainingDisplayColumns =
          x?.remainingDisplayColumns && x?.remainingDisplayColumns !== null
            ? [...x?.remainingDisplayColumns]
            : [];
        this.fusionFormGroup = this._formBuilder.group({
          columnControl: [this.displayColumns[0]]
        });
      })
      .unsubscribe();
    this.hiddenColumns = this.displayColumns.filter((ele) => {
      return ele.hideEditColumn == true;
    });
  }

  ngAfterViewInit(): void {
    this.drawerService.setPrimaryActionState(false, false);
  }

  primaryAction() {
    this.dataSourceFacade.DisplayColumnUpdate(
      this.displayColumns,
      this.remainingDisplayColumns
    );
    this.drawerService.closeDrawer();
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
