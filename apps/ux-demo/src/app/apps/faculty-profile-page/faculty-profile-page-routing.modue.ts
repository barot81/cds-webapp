import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultyProfilePageComponent } from './faculty-profile-page.component';

const routes: Routes = [
  {
    path: 'faculty-profile-page',
    component: FacultyProfilePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'faculty-profile-page',
        pathMatch: 'full'
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyProfilePageRoutingModule { }

