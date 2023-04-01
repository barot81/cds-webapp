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
} from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';

import { TypographyComponent } from './typography.component';
import { TypographyHeadingsComponent } from './tabs/headings/headings.component';
import { TypographyInlineTextElementsComponent } from './tabs/inline-text-elements/inline-text-elements.component';
import { TypographyBlockquotesListsComponent } from './tabs/blockquotes-lists/blockquotes-lists.component';
import { TypographyHelpersComponent } from './tabs/helpers/helpers.component';
import { ExxatTypographyComponent } from './tabs/exxat-typography/exxat-typography.component';
import { ExxatCardsComponent } from './tabs/exxat-cards/exxat-cards.component';
import { ExxatThemesComponent } from './tabs/exxat-themes/exxat-themes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExxatMediaQueryComponent } from './tabs/exxat-media-query/exxat-media-query.component';
import { MatDividerModule } from '@angular/material/divider';
import { ExxatInlineTextElementsComponent } from './tabs/exxat-inline-text-elements/exxat-inline-text-elements.component';
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
        component: ExxatTypographyComponent,
      },
      {
        path: 'inline-text-elements',
        component: ExxatInlineTextElementsComponent,
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
        component: ExxatMediaQueryComponent,
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
    ExxatTypographyComponent,
    ExxatCardsComponent,
    ExxatThemesComponent,
    ExxatMediaQueryComponent,
    ExxatInlineTextElementsComponent,
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
