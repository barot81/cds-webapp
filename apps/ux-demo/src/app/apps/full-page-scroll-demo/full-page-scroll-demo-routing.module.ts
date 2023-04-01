import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullPageScrollDemoComponent } from './full-page-scroll-demo/full-page-scroll-demo.component';
import { AuthGuardService } from '@zhealthcare/fusion/core';
import { FullPageScrollReviewDemoComponent } from './tabs/full-page-scroll-review-demo/full-page-scroll-review-demo.component';
import { ReviewStudentComponent } from './tabs/review-student/review-student.component';

const routes: Routes = [{
  path: '',
  component: FullPageScrollDemoComponent,
  canActivate: [AuthGuardService],
  children: [
    {
      path: '',
      redirectTo: 'admin-review',
      pathMatch: 'full'
    },
    {
      path: 'admin-review',
      component: FullPageScrollReviewDemoComponent
    },
    {
      path: 'student-review',
      component: ReviewStudentComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullPageScrollDemoRoutingModule { }
