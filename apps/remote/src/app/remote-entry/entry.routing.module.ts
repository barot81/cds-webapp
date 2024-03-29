import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RemoteEntryComponent } from "./entry.component";

const routes: Routes = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: 'patients',
        loadChildren: () => import('../patients/patients.module').then(m => m.PatientsModule)
      },
      {
        path: 'postdischargepatients',
        loadChildren: () => import('../pd-patients/pd-patients.module').then(m => m.PdPatientsModule)
      },
      {
        path: '',
        redirectTo:'patients',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteEntryRoutingModule { }
