import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  MaterialModule,
  FuseSharedModule,
  FuseThemeOptionsModule,
} from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { ExxatTagExampleComponent } from './exxat-tag-example.component';
import { ExxatTagModule } from '@exxat/plugin/tags';
import { ExxatTagExampleOneComponent } from './examples/exxat-tag-example-one/exxat-tag-example-one.component';
import { ExxatTagExampleTwoComponent } from './examples/exxat-tag-example-two/exxat-tag-example-two.component';
import { ExxatTagExampleThreeComponent } from './examples/exxat-tag-example-three/exxat-tag-example-three.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'exxat-tags',
    component: ExxatTagExampleComponent,
    children: [
      {
        path: '',
        redirectTo: 'example-one',
        pathMatch: 'full'
      },
      {
        path: 'example-one',
        component: ExxatTagExampleOneComponent,
        pathMatch: 'full'
      },
      {
        path: 'example-two',
        component: ExxatTagExampleTwoComponent,
        pathMatch: 'full'
      },
      {
        path: 'example-three',
        component: ExxatTagExampleThreeComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    ExxatTagExampleComponent,
    ExxatTagExampleOneComponent,
    ExxatTagExampleTwoComponent,
    ExxatTagExampleThreeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MaterialModule,
    ExxatTagModule,
    FlexLayoutModule,
    FuseHighlightModule,
    FuseThemeOptionsModule
  ]
})
export class ExxatTagExampleModule {}
