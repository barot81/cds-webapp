import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import {
  AcademicInfoComponent,
  ContactComponent,
  StudentInfoComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'academic-info',
        pathMatch: 'full'
      },
      {
        path: 'academic-info',
        component: AcademicInfoComponent,
      },
      {
        path: 'student-info',
        component: StudentInfoComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StickyTableHeaderLayoutRoutingModule {}
