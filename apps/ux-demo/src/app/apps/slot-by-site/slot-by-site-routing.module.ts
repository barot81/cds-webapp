import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { SlotBySiteComponent } from './slot-by-site.component';


const routes: Routes = [
  {
    path: 'Slot_By_Site_Demo',
    component: SlotBySiteComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      
      {
        path: 'tab1',
        component: SlotBySiteComponent
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotBySiteRoutingModule { }
