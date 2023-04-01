import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@zhealthcare/fusion/core';

import { zhealthcareFormsComponent } from './zhealthcare-forms.component';
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
    path: 'zhealthcare-forms',
    component: zhealthcareFormsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'zhealthcare-forms-ui',
        pathMatch: 'full',
      },
      {
        path: 'zhealthcare-forms-ui',
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
export class zhealthcareFormsRoutingModule {}
