/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DrawerAdapter, ManifoldPanelService, DrawerService } from '@zhealthcare/ux';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataSourceFacade } from '../../store/facades/datasource.facade';
import { FusionFormComponent } from '@zhealthcare/fusion/components';
import { ColumnOption } from '../../models/response.model';

@Component({
  selector: 'zhealthcare-display-columns-form',
  templateUrl: './zhealthcare-display-columns-form.component.html',
})
export class zhealthcareDisplayColumnsFormComponent
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
    public dataSourceFacade: DataSourceFacade,
    private readonly _maniFoldPanelService: ManifoldPanelService,
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
          columnControl: [this.displayColumns[0]],
        });
      })
      .unsubscribe();
    this.hiddenColumns = this.displayColumns.filter((ele) => {
      return ele.hideEditColumn == true;
    });
  }

  ngAfterViewInit(): void {
    this._maniFoldPanelService.managePrimaryActionStyle(true);
  }

  primaryAction() {
    this.dataSourceFacade.DisplayColumnUpdate(
      this.displayColumns,
      this.remainingDisplayColumns
    );
    this._maniFoldPanelService.closeCurrentManifoldPanel();
  }

  secondaryAction() {
    // throw new Error('Method not implemented.');
  }

  drop(event: CdkDragDrop<ColumnOption[]>) {
    this._maniFoldPanelService.managePrimaryActionStyle(
      !this.fusionFormGroup.valid
    );
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
      this._maniFoldPanelService.managePrimaryActionStyle(
        !this.fusionFormGroup.valid
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
    this._maniFoldPanelService.managePrimaryActionStyle(
      !this.fusionFormGroup.valid
    );
  }
}
