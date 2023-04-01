import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MaterialModule, FuseSharedModule, FuseThemeOptionsModule, FuseProgressBarModule, ExxatAvatarModule, ExxatCarouselModule, ExxatTooltipModule, FuseDirectivesModule, FuseModule, FuseSidebarModule } from '@exxat/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FuseHighlightModule } from "../../../../helpers/highlight/highlight.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { ExxatTagModule } from "@exxat/plugin/tags";
import { ExxatAccordiansComponent } from './exxat-accordians/exxat-accordians.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExxatAccordianVariationsComponent } from './tabs/exxat-accordian-variations/exxat-accordian-variations.component';
import { ExxatAccordianWithGridComponent } from './tabs/exxat-accordian-with-grid/exxat-accordian-with-grid.component';

const routes: Routes = [
    {
      path: 'exxat-accordian',
      component: ExxatAccordiansComponent,
      children: [
        {
          path: '',
          redirectTo: 'accordian-example-one',
          pathMatch: 'full'
        },
        {
          path: 'accordian-example-one',
          component: ExxatAccordianVariationsComponent
        },
        {
          path: 'accordian-example-two',
          component: ExxatAccordianWithGridComponent
        }
      ]
    }
  ];
  
  @NgModule({
    declarations: [
      ExxatAccordiansComponent,
      ExxatAccordianVariationsComponent,
      ExxatAccordianWithGridComponent,
      NavbarComponent
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MatIconModule,
      MatTabsModule,
      ExxatAvatarModule,
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
      ExxatCarouselModule,
      FlexLayoutModule,
      FuseThemeOptionsModule,
      ExxatTagModule,
      ExxatTooltipModule,
      MatChipsModule,
      MatCardModule,
      FuseDirectivesModule
    ]
  })
  export class ExxatAccordianDemoModule {}
  
