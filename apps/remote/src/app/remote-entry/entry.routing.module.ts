import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoleGuardService } from "../routes/role-guard.service";
import { RemoteEntryComponent } from "./entry.component";

const routes: Routes = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: 'patients',
        loadChildren: () => import('../patients/patients.module').then(m => m.PatientsModule),
        canActivate: [RoleGuardService],
        data: {
          groups: ["Management", "MD CDI"]
        }
      },
      {
        path: 'pd-patients',
        loadChildren: () => import('../pd-patients/pd-patients.module').then(m => m.PdPatientsModule),
        canActivate: [RoleGuardService],
        data: {
          groups: ["Management", "Claim Optimization"]
        }
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
