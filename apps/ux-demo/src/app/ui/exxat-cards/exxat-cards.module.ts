import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FuseSharedModule,
  MaterialModule,
  FuseModule,
  FuseSidebarModule,
  FuseProgressBarModule,
  ExxatCarouselModule,
  FuseThemeOptionsModule,
  ExxatAvatarModule,
  ExxatTooltipModule,
  FuseDirectivesModule,
} from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { MatDividerModule } from '@angular/material/divider';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExxatCardExample1Component } from './tabs/exxat-card-example1/exxat-card-example1.component';
import { ExxatCardsComponent } from './exxat-cards/exxat-cards.component';
import { CheckboxRowExampleComponent } from './tabs/checkbox-row-example/checkbox-row-example.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { ExxatTagModule } from '@exxat/plugin/tags';
import { CardWithTableAndAccordianComponent } from './tabs/card-with-table-and-accordian/card-with-table-and-accordian.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: 'cards',
    component: ExxatCardsComponent,
    children: [
      {
        path: '',
        redirectTo: 'card-example-one',
        pathMatch: 'full',
      },
      {
        path: 'card-example-one',
        component: ExxatCardExample1Component,
      },
      {
        path: 'card-example-two',
        component: CheckboxRowExampleComponent,
      },
      {
        path: 'card-example-three',
        component: CardWithTableAndAccordianComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ExxatCardsComponent,
    ExxatCardExample1Component,
    CheckboxRowExampleComponent,
    NavbarComponent,
    CardWithTableAndAccordianComponent
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
  ],
})
export class ExxatCardsModule {}
