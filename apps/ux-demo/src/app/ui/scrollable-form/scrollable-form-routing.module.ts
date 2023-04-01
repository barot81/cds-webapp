import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrollableFormContainerComponent } from './container/scrollable-form-container.component';
const routes: Routes = [
  {
    path: 'scrollable-form',
    component: ScrollableFormContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrollableFormRoutingModule {}
