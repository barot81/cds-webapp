import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import {
  FuseSharedModule,
  MaterialModule,
  FuseProgressBarModule,
  FuseModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
} from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';

import { TypographyComponent } from './typography.component';
import { TypographyHeadingsComponent } from './tabs/headings/headings.component';
import { TypographyInlineTextElementsComponent } from './tabs/inline-text-elements/inline-text-elements.component';
import { TypographyBlockquotesListsComponent } from './tabs/blockquotes-lists/blockquotes-lists.component';
import { TypographyHelpersComponent } from './tabs/helpers/helpers.component';
import { zhealthcareTypographyComponent } from './tabs/zhealthcare-typography/zhealthcare-typography.component';
import { zhealthcareCardsComponent } from './tabs/zhealthcare-cards/zhealthcare-cards.component';
import { zhealthcareThemesComponent } from './tabs/zhealthcare-themes/zhealthcare-themes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { zhealthcareMediaQueryComponent } from './tabs/zhealthcare-media-query/zhealthcare-media-query.component';
import { MatDividerModule } from '@angular/material/divider';
import { zhealthcareInlineTextElementsComponent } from './tabs/zhealthcare-inline-text-elements/zhealthcare-inline-text-elements.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'typography',
    component: TypographyComponent,
    children: [
      {
        path: '',
        redirectTo: 'typography',
        pathMatch: 'full',
      },
      {
        path: 'typography',
        component: zhealthcareTypographyComponent,
      },
      {
        path: 'inline-text-elements',
        component: zhealthcareInlineTextElementsComponent,
      },
      {
        path: 'blockquotes-lists',
        component: TypographyBlockquotesListsComponent,
      },
      {
        path: 'helpers',
        component: TypographyHelpersComponent,
      },
      {
        path: 'media-query',
        component: zhealthcareMediaQueryComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    TypographyComponent,
    TypographyHeadingsComponent,
    TypographyInlineTextElementsComponent,
    TypographyBlockquotesListsComponent,
    TypographyHelpersComponent,
    zhealthcareTypographyComponent,
    zhealthcareCardsComponent,
    zhealthcareThemesComponent,
    zhealthcareMediaQueryComponent,
    zhealthcareInlineTextElementsComponent,
    NavbarComponent,
  ],
  imports: [
    RouterModule.forChild(routes),

    MatIconModule,
    MatTabsModule,

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
    FuseThemeOptionsModule,
  ],
})
export class UITypographyModule {}
