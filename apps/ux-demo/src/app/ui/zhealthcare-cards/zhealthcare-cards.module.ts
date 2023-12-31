import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FuseSharedModule,
  MaterialModule,
  FuseModule,
  FuseSidebarModule,
  FuseProgressBarModule,
  zhealthcareCarouselModule,
  FuseThemeOptionsModule,
  zhealthcareAvatarModule,
  zhealthcareTooltipModule,
  FuseDirectivesModule,
} from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { MatDividerModule } from '@angular/material/divider';
import { Routes, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { zhealthcareCardExample1Component } from './tabs/zhealthcare-card-example1/zhealthcare-card-example1.component';
import { zhealthcareCardsComponent } from './zhealthcare-cards/zhealthcare-cards.component';
import { CheckboxRowExampleComponent } from './tabs/checkbox-row-example/checkbox-row-example.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';
import { CardWithTableAndAccordianComponent } from './tabs/card-with-table-and-accordian/card-with-table-and-accordian.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: 'cards',
    component: zhealthcareCardsComponent,
    children: [
      {
        path: '',
        redirectTo: 'card-example-one',
        pathMatch: 'full',
      },
      {
        path: 'card-example-one',
        component: zhealthcareCardExample1Component,
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
    zhealthcareCardsComponent,
    zhealthcareCardExample1Component,
    CheckboxRowExampleComponent,
    NavbarComponent,
    CardWithTableAndAccordianComponent
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
  ],
})
export class zhealthcareCardsModule {}
