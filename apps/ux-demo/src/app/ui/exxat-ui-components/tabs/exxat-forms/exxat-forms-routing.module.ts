import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@exxat/fusion/core';

import { ExxatFormsComponent } from './exxat-forms.component';
import { FormEventComponent } from './form-event/form-event.component';
import { FormRequestComponent } from './form-request/form-request.component';
import { FormResponseComponent } from './form-response/form-response.component';
import { FormsUiComponent } from './forms-ui/forms-ui.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductPlatformInterfaceComponent } from './product-platform-interface/product-platform-interface.component';
import { ResponseComponent } from './response/response.component';
import { WorkflowComponent } from './workflow/workflow.component';

const routes: Routes = [
  {
    path: 'exxat-forms',
    component: ExxatFormsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'exxat-forms-ui',
        pathMatch: 'full',
      },
      {
        path: 'exxat-forms-ui',
        component: FormsUiComponent,
      },
      {
        path: 'layout',
        component: LayoutComponent,
      },
      {
        path: 'workflow',
        component: WorkflowComponent,
      },
      {
        path: 'response',
        component: ResponseComponent,
      },
      {
        path: 'forms-ingterface',
        component: ProductPlatformInterfaceComponent,
      },
      {
        path: 'form-request',
        component: FormRequestComponent,
      },
      {
        path: 'form-response',
        component: FormResponseComponent,
      },
      {
        path: 'form-event',
        component: FormEventComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class ExxatFormsRoutingModule {}
