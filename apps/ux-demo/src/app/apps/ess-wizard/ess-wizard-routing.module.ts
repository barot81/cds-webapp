import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EssWizardComponent } from './ess-wizard.component';

const routes: Routes = [
  {
    path: 'ESS-wizard',
    component: EssWizardComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      
      {
        path: 'tab1',
        component: EssWizardComponent
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ESSWizardRoutingModule { }
