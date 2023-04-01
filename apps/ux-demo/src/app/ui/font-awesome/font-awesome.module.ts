import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeMasterComponent } from './font-awesome-master.component';
import { FontAwesomeExampleComponent } from './examples/font-awesome-example/font-awesome-example/font-awesome-example.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule, FuseSharedModule } from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';

const routes: Routes = [
  {
    path: 'font-awesome',
    component: FontAwesomeMasterComponent
  }
];

@NgModule({
  declarations: [FontAwesomeMasterComponent, FontAwesomeExampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FuseSharedModule,
    FuseHighlightModule
  ]
})
export class FontAwesomeModule { }
