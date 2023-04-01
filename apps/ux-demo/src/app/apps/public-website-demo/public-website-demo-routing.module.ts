import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicWebsiteAppComponent } from './pages/public-website-app/public-website-app.component';
import { PublicWebsiteDemoComponent } from './public-website-demo.component';



const routes: Routes = [
  {
    path: 'public-website-demo',
    component: PublicWebsiteDemoComponent,
  
  },
  {
    path: 'public-website-home',
    component: PublicWebsiteAppComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicWebsiteDemoRoutingModule { }
