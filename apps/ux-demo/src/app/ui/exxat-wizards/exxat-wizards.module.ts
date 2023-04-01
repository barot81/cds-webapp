import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExxatWizardComponent } from './exxat-wizard.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuseModule, FuseSharedModule, FuseThemeOptionsModule, MaterialModule } from '@exxat/ux';
import { FlexModule } from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';


const routes: Routes = [
  {
    path: 'exxat-wizards',
    component: ExxatWizardComponent
  }
];


@NgModule({
  declarations: [ExxatWizardComponent],
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
     MatTabsModule,
     MaterialModule,
     FuseThemeOptionsModule
  ]
})
export class ExxatWizardsModule { }
