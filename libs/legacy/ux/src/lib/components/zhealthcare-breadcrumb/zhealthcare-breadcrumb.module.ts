import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zhealthcareBreadcrumbComponent } from './zhealthcare-breadcrumb.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [zhealthcareBreadcrumbComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [zhealthcareBreadcrumbComponent]
})
export class zhealthcareBreadcrumbModule { }
