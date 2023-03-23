import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@exxat/fusion/core';
import { PowerBIComponent } from './power-bi.component';

const routes: Routes = [
   {
     path: '',
     component: PowerBIComponent,
     canActivate: [AuthGuardService]
   }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class PowerBIRoutingModule { }
