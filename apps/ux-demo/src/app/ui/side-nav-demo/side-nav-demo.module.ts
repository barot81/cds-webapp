import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavContainerComponent } from './side-nav-container/side-nav-container.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@zhealthcare/ux';


const routes: Routes = [
  {
    path: 'side-nav-demo',
    component: SideNavContainerComponent
  }
];

@NgModule({
  declarations: [SideNavContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class SideNavDemoModule { }
