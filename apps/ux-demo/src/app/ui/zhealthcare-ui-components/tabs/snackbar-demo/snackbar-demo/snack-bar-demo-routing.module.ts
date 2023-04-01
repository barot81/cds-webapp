import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnackbarExampleOneComponent } from '../examples/snackbar-example-one/snackbar-example-one.component';
import { SnackbarExampleTwoComponent } from '../examples/snackbar-example-two/snackbar-example-two.component';
import { SnackbarWithWarnBgComponent } from '../examples/snackbar-with-warn-bg/snackbar-with-warn-bg.component';
import { SnackbarWithoutActionComponent } from '../examples/snackbar-without-action/snackbar-without-action.component';
import { SnackbarDemoComponent } from './snackbar-demo.component';

const routes: Routes = [
  {
    path: 'snackbar',
    component: SnackbarDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'with-close',
        pathMatch: 'full',
      },
      {
        path: 'with-close',
        component: SnackbarExampleTwoComponent,
      },
      {
        path: 'with-action',
        component: SnackbarExampleOneComponent,
      },
      {
        path: 'without-action',
        component: SnackbarWithoutActionComponent,
      },
      {
        path: 'unsuccess',
        component: SnackbarWithWarnBgComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SnackBarDemoRoutingModule {}
