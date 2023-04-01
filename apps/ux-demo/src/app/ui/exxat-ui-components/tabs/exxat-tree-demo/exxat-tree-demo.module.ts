import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  MaterialModule,
  FuseSharedModule,
  zhealthcareTreeModule,
  zhealthcareAvatarModule,
  FuseThemeOptionsModule,
} from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { CommonModule } from '@angular/common';
import { zhealthcareTreeDemoComponent } from './zhealthcare-tree-demo.component';
import { TreeVariationOneComponent } from './variations/tree-variation-one/tree-variation-one.component';
import { TreeVariationTwoComponent } from './variations/tree-variation-two/tree-variation-two.component';
import { TreeVariationThreeComponent } from './variations/tree-variation-three/tree-variation-three.component';
import { TreeVariationFourComponent } from './variations/tree-variation-four/tree-variation-four.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { ChecklistDatabase } from './variations/tree-data.service';
import { TreeVariationFiveComponent } from './variations/tree-variation-five/tree-variation-five.component';
import { PlanTreeDemoComponent } from './variations/plan-tree-demo/plan-tree-demo.component';
import { TreeVariationSixComponent } from './variations/tree-variation-six/tree-variation-six.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileDatabase } from './variations/tree-variation-six/file-database.service';
import { TreeVariationSevenComponent } from './variations/tree-variation-seven/tree-variation-seven.component';
import { TreeVariationEightComponent } from './variations/tree-variation-eight/tree-variation-eight.component';
import { TreeDummyDataService } from './variations/tree-variation-eight/tree-dummy-data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PlanAppDemoDrawerService } from '../../../../apps/plan-app-demo/plan-app-demo-drawer.service';

const routes: Routes = [
  {
    path: 'zhealthcare-trees',
    component: zhealthcareTreeDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'example-one',
        pathMatch: 'full',
      },
      {
        path: 'example-one',
        component: TreeVariationOneComponent,
      },
      {
        path: 'example-two',
        component: TreeVariationTwoComponent,
      },
      {
        path: 'example-three',
        component: TreeVariationThreeComponent,
      },
      {
        path: 'example-four',
        component: TreeVariationFourComponent,
      },
      {
        path: 'example-five',
        component: TreeVariationFiveComponent,
      },
      {
        path: 'example-six',
        component: TreeVariationSixComponent,
      },
      {
        path: 'example-seven',
        component: TreeVariationSevenComponent,
      },
      {
        path: 'example-eight',
        component: TreeVariationEightComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    zhealthcareTreeDemoComponent,
    TreeVariationOneComponent,
    TreeVariationTwoComponent,
    TreeVariationThreeComponent,
    TreeVariationFourComponent,
    TreeVariationFiveComponent,
    PlanTreeDemoComponent,
    TreeVariationSixComponent,
    TreeVariationSevenComponent,
    TreeVariationEightComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FuseSharedModule,
    MaterialModule,
    FlexLayoutModule,
    FuseHighlightModule,
    zhealthcareTreeModule,
    MatTabsModule,
    MatTreeModule,
    zhealthcareAvatarModule,
    DragDropModule,
    FuseThemeOptionsModule,
  ],
  providers: [
    ChecklistDatabase,
    FileDatabase,
    PlanAppDemoDrawerService,
    TreeDummyDataService,
  ],
  exports: [PlanTreeDemoComponent],
})
export class zhealthcareTreeDemoModule {}
