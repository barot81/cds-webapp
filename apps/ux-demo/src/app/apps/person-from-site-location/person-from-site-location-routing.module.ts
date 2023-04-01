import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonFromSiteLocationComponent } from './person-from-site-location.component';


const routes: Routes = [
  {
    path: 'person-from-site-location',
    component: PersonFromSiteLocationComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      },
      
      {
        path: 'tab1',
        component: PersonFromSiteLocationComponent
      },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonFromSiteLocationRoutingModule { }
