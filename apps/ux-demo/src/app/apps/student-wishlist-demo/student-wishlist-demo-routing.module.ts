import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentWishlistDemoComponent } from './student-wishlist-demo.component';


const routes: Routes = [
  {
    path: 'student-wishlist-demo',
    component: StudentWishlistDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'student-wishlist-demo',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentWishlistDemoRoutingModule { }
