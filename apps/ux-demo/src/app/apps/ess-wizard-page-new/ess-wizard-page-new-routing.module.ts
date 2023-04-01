import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EssWizardPageNewComponent } from './ess-wizard-page-new.component';

const routes: Routes = [
  {
    path: 'ess-wizard-page-new',
    component: EssWizardPageNewComponent,
    children: [
      {
        path: '',
        redirectTo: 'ess-wizard-page-new',
        pathMatch: 'full'
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EssWizardPageNewComponentRoutingModule { }

