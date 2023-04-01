import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { zhealthcareWizardComponent } from './zhealthcare-wizard.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuseModule, FuseSharedModule, FuseThemeOptionsModule, MaterialModule } from '@zhealthcare/ux';
import { FlexModule } from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';


const routes: Routes = [
  {
    path: 'zhealthcare-wizards',
    component: zhealthcareWizardComponent
  }
];


@NgModule({
  declarations: [zhealthcareWizardComponent],
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
export class zhealthcareWizardsModule { }
