import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, FuseThemeOptionsModule, FuseProgressBarModule, zhealthcareAvatarModule, zhealthcareCarouselModule, zhealthcareTooltipModule, FuseDirectivesModule, FuseModule, FuseSidebarModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { zhealthcareTagModule } from "@zhealthcare/plugin/tags";
import { zhealthcareAccordiansComponent } from './zhealthcare-accordians/zhealthcare-accordians.component';
import { NavbarComponent } from './navbar/navbar.component';
import { zhealthcareAccordianVariationsComponent } from './tabs/zhealthcare-accordian-variations/zhealthcare-accordian-variations.component';
import { zhealthcareAccordianWithGridComponent } from './tabs/zhealthcare-accordian-with-grid/zhealthcare-accordian-with-grid.component';

const routes: Routes = [
    {
      path: 'zhealthcare-accordian',
      component: zhealthcareAccordiansComponent,
      children: [
        {
          path: '',
          redirectTo: 'accordian-example-one',
          pathMatch: 'full'
        },
        {
          path: 'accordian-example-one',
          component: zhealthcareAccordianVariationsComponent
        },
        {
          path: 'accordian-example-two',
          component: zhealthcareAccordianWithGridComponent
        }
      ]
    }
  ];

  @NgModule({
    declarations: [
      zhealthcareAccordiansComponent,
      zhealthcareAccordianVariationsComponent,
      zhealthcareAccordianWithGridComponent,
      NavbarComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MatIconModule,
      MatTabsModule,
      zhealthcareAvatarModule,
      FuseSharedModule,
      FuseHighlightModule,
      MaterialModule,
      ReactiveFormsModule,
      FormsModule,
      FuseProgressBarModule,
      FuseSharedModule,
      FuseModule,
      FuseSidebarModule,
      MatDividerModule,
      zhealthcareCarouselModule,
      FlexLayoutModule,
      FuseThemeOptionsModule,
      zhealthcareTagModule,
      zhealthcareTooltipModule,
      MatChipsModule,
      MatCardModule,
      FuseDirectivesModule
    ]
  })
  export class zhealthcareAccordianDemoModule {}

