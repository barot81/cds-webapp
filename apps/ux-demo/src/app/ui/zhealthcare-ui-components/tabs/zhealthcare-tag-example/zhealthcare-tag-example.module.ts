import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  MaterialModule,
  FuseSharedModule,
  FuseThemeOptionsModule,
} from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { zhealthcareTagExampleComponent } from './zhealthcare-tag-example.component';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';
import { zhealthcareTagExampleOneComponent } from './examples/zhealthcare-tag-example-one/zhealthcare-tag-example-one.component';
import { zhealthcareTagExampleTwoComponent } from './examples/zhealthcare-tag-example-two/zhealthcare-tag-example-two.component';
import { zhealthcareTagExampleThreeComponent } from './examples/zhealthcare-tag-example-three/zhealthcare-tag-example-three.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'zhealthcare-tags',
    component: zhealthcareTagExampleComponent,
    children: [
      {
        path: '',
        redirectTo: 'example-one',
        pathMatch: 'full'
      },
      {
        path: 'example-one',
        component: zhealthcareTagExampleOneComponent,
        pathMatch: 'full'
      },
      {
        path: 'example-two',
        component: zhealthcareTagExampleTwoComponent,
        pathMatch: 'full'
      },
      {
        path: 'example-three',
        component: zhealthcareTagExampleThreeComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    zhealthcareTagExampleComponent,
    zhealthcareTagExampleOneComponent,
    zhealthcareTagExampleTwoComponent,
    zhealthcareTagExampleThreeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MaterialModule,
    zhealthcareTagModule,
    FlexLayoutModule,
    FuseHighlightModule,
    FuseThemeOptionsModule
  ]
})
export class zhealthcareTagExampleModule {}
