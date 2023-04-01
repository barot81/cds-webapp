import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapOfAffiliationDemoComponent } from './map-of-affiliation-demo.component';

const routes: Routes = [
  {
    path: 'map-of-affiliation-demo',
    component: MapOfAffiliationDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'map-of-affiliation-demo',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapOfAffiliationDemoRoutingModule { }
