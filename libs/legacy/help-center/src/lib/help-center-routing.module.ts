import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelpCenterPopupComponent } from './help-center-popup.component';

const routes: Routes = [
  {
    path: '',
    component: HelpCenterPopupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpCenterRoutingModule {}
