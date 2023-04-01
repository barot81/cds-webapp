import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReleaseNotesDemoAppPageComponent } from './pages/release-notes-demo-app-page/release-notes-demo-app-page.component';

const routes: Routes = [
  {
    path: '',
    component: ReleaseNotesDemoAppPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseNotesDemoAppRoutingModule { }
