import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleSearchBarComponent } from './simple-search-bar/simple-search-bar.component';
import { SearchBarWithDropdownComponent } from './search-bar-with-dropdown/search-bar-with-dropdown.component';
import { SearchBarWithAutoSelectionComponent } from './search-bar-with-auto-selection/search-bar-with-auto-selection.component';
import { Routes, RouterModule } from '@angular/router';
import {
  MaterialModule,
  FuseSharedModule,
  zhealthcareAvatarListItemModule,
  LayoutModule,
  FuseModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
  FuseDirectivesModule,
} from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { SearchBarExamplesComponent } from './search-bar-examples.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'search-bar',
    component: SearchBarExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'simple-search-bar',
        pathMatch: 'full',
      },
      {
        path: 'simple-search-bar',
        component: SimpleSearchBarComponent,
      },
      {
        path: 'search-with-drop-down',
        component: SearchBarWithDropdownComponent,
      },
      {
        path: 'search-with-auto-complete',
        component: SearchBarWithAutoSelectionComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    SimpleSearchBarComponent,
    SearchBarWithDropdownComponent,
    SearchBarWithAutoSelectionComponent,
    SearchBarExamplesComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    FuseHighlightModule,
    zhealthcareAvatarListItemModule,
    LayoutModule,
    FuseModule,
    FuseSidebarModule,
    DataSourceModule,
    FuseThemeOptionsModule,
    FuseDirectivesModule,
    ReactiveFormsModule,
  ],
})
export class SearchBarExamplesModule {}
