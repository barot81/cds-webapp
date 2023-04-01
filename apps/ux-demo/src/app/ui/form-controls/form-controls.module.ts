import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import {
  ExxatCalendarModule,
  ExxatMatSelectSearchModule,
  ExxatTimePickerModule,
  ExxatTooltipModule,
  Exxat_DATE_FORMATS,
  FuseModule,
  FuseSharedModule,
  FuseThemeOptionsModule,
  MaterialModule,
  NgxMaterialTimepickerModule
} from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { ExxatDrawerFormService } from '../exxat-drawers/exxat-drawer-forms-shared.service';
import { ExxatMatSelectSearchExample } from './exxat-mat-select-search-example/exxat-mat-select-search-example.component';
import { FormControlsComponent } from './form-controls.component';
import { NavbarComponent } from './navbar/navbar.component';
import {
  CheckboxAndRadioButtonExampleComponent,
  CommonControlsPageComponent,
  DateAndTimePickersPageComponent,
  DropDownListPageComponent
} from './pages';

const routes: Routes = [
  {
    path: 'form-controls',
    component: FormControlsComponent,
    children: [
      {
        path: '',
        redirectTo: 'common-controls',
        pathMatch: 'full',
      },
      {
        path: 'common-controls',
        component: CommonControlsPageComponent,
      },
      {
        path: 'checkbox-radio-validation',
        component: CheckboxAndRadioButtonExampleComponent,
      },
      {
        path: 'date-time-picker-controls',
        component: DateAndTimePickersPageComponent,
      },
      {
        path: 'mat-select',
        component: DropDownListPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    FormControlsComponent,
    CommonControlsPageComponent,
    DateAndTimePickersPageComponent,
    DropDownListPageComponent,
    ExxatMatSelectSearchExample,
    NavbarComponent,
    CheckboxAndRadioButtonExampleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatStepperModule,
    FuseHighlightModule,
    ReactiveFormsModule,
    FormsModule,
    FuseModule,
    FuseSharedModule,
    FlexModule,
    MaterialModule,
    MatTabsModule,
    MatFormFieldModule,
    ExxatTimePickerModule,
    NgxMaterialTimepickerModule,
    ExxatTooltipModule,
    ExxatMatSelectSearchModule,
    FuseThemeOptionsModule,
    ExxatCalendarModule
  ],
  providers: [
    ExxatDrawerFormService,
    { provide: MAT_DATE_FORMATS, useValue: Exxat_DATE_FORMATS },
  ],
})
export class FormControlsModule {}
