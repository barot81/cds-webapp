import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExxatBreadcrumbComponent } from './exxat-breadcrumb.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ExxatBreadcrumbComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [ExxatBreadcrumbComponent]
})
export class ExxatBreadcrumbModule { }
