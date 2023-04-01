import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule, FuseThemeOptionsModule, ExxatTooltipModule } from '@exxat/ux';
import { DragAndDropPageComponent } from './pages';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';

const routes: Routes = [
  {
    path: 'drag-and-drop',
    component: DragAndDropPageComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MaterialModule,
    DragDropModule,
    FuseThemeOptionsModule,
    FuseHighlightModule,
    ExxatTooltipModule
  ],
  declarations: [DragAndDropPageComponent],
  providers: [],
})
export class DragAndDropModule {}
