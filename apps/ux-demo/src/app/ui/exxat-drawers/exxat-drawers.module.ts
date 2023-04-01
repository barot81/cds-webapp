import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@exxat/plugin/ckeditor';
import {
  BackNavigationGuard,
  FileUploadModule,
  FuseDirectivesModule,
  FuseModule,
  FuseProgressBarModule,
  FuseSharedModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
  LayoutModule,
  MaterialModule,
} from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { SidebarFocusHelper } from '../exxat-sidebar/exxat-sidebar.service';
import { DialogBoxComponent } from './examples/dialog-box/dialog-box.component';
import { DrawerFiltersDemoComponent } from './examples/drawer-filters-demo/drawer-filters-demo/drawer-filters-demo.component';
import { DrawerFilterExampleOneComponent } from './examples/drawer-filters-demo/drawers/drawer-filter-example-one/drawer-filter-example-one.component';
import { DrawerWithCardsContainerComponent } from './examples/drawer-with-cards-container/drawer-with-cards-container.component';
import { DrawerWithCardsComponent } from './examples/drawer-with-cards-container/drawer/drawer-with-cards/drawer-with-cards.component';
import { DrawerWithStickyButtonsContainerComponent } from './examples/drawer-with-sticky-buttons-container/drawer-with-sticky-buttons-container.component';
import { DrawerWithStickyButtonsComponent } from './examples/drawer-with-sticky-buttons/drawer-with-sticky-buttons.component';
import { drawerWithWizardComponent } from './examples/drawer-with-wizard/drawer-with-wizard.component';
import { ExxatDrawerDisableFormComponent } from './examples/exxat-drawer-disable-form/exxat-drawer-disable-form.component';
import { ExxatDrawerFormExamplesComponent } from './examples/exxat-drawer-form-examples/exxat-drawer-form-examples.component';
import { ExxatDrawerReactiveFormComponent } from './examples/exxat-drawer-reactive-form/exxat-drawer-reactive-form.component';
import { ExxatDrawerWithDragDropComponent } from './examples/exxat-drawer-with-drag-drop/exxat-drawer-with-drag-drop.component';
import { ExxatDrawerWithHighlightMenuContainerComponent } from './examples/exxat-drawer-with-highlight-menu-container/exxat-drawer-with-highlight-menu-container.component';
import { ExxatDrawerWithHighlightMenuComponent } from './examples/exxat-drawer-with-highlight-menu/exxat-drawer-with-highlight-menu.component';
import { ExxatDrawersSizesComponent } from './examples/exxat-drawers-sizes/exxat-drawers-sizes.component';
import { ExxatMultiDrawerContainerComponent } from './examples/exxat-multi-drawer-container/exxat-multi-drawer-container.component';
import { ExxatMultiDrawerComponent } from './examples/exxat-multi-drawer/exxat-multi-drawer.component';
import { DrawerColumnsComponent } from './examples/exxat-two-column-drawer/drawer-columns/drawer-columns.component';
import { ExxatTwoColumnDrawerComponent } from './examples/exxat-two-column-drawer/exxat-two-column-drawer.component';
import { ExxatDrawerFormService } from './exxat-drawer-forms-shared.service';
import { ExxatDrawersComponent } from './exxat-drawers.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'exxat-drawers',
    component: ExxatDrawersComponent,
    canDeactivate: [BackNavigationGuard],
    children: [
      {
        path: '',
        redirectTo: 'drawer-sizes',
        pathMatch: 'full',
      },
      {
        path: 'drawer-sizes',
        component: ExxatDrawersSizesComponent,
        canDeactivate: [BackNavigationGuard],
      },
      {
        path: 'multi-drawer',
        component: ExxatMultiDrawerContainerComponent,
        canDeactivate: [BackNavigationGuard],
      },
      {
        path: 'drawer-with-cards',
        component: DrawerWithCardsContainerComponent,
        canDeactivate: [BackNavigationGuard],
      },

      {
        path: 'drawer-with-drag-drop',
        component: ExxatDrawerWithDragDropComponent,
        canDeactivate: [BackNavigationGuard],
      },
      {
        path: 'drawer-with-two-column',
        component: ExxatTwoColumnDrawerComponent,
        canDeactivate: [BackNavigationGuard],
      },
      {
        path: 'drawer-with-filter',
        component: DrawerFiltersDemoComponent,
        canDeactivate: [BackNavigationGuard],
      },
      {
        path: 'drawer-with-sticky-elements',
        component: DrawerWithStickyButtonsContainerComponent,
        canDeactivate: [BackNavigationGuard],
      },
      {
        path: 'drawer-with-highlight-menu',
        component: ExxatDrawerWithHighlightMenuContainerComponent,
        canDeactivate: [BackNavigationGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ExxatDrawersComponent,
    ExxatDrawersSizesComponent,
    ExxatDrawerReactiveFormComponent,
    DrawerWithStickyButtonsContainerComponent,
    DrawerWithStickyButtonsComponent,
    ExxatDrawerFormExamplesComponent,
    ExxatDrawerWithDragDropComponent,
    ExxatTwoColumnDrawerComponent,
    DrawerColumnsComponent,
    DialogBoxComponent,
    DrawerFiltersDemoComponent,
    DrawerFilterExampleOneComponent,
    DrawerWithCardsContainerComponent,
    DrawerWithCardsComponent,
    ExxatMultiDrawerComponent,
    ExxatMultiDrawerContainerComponent,
    ExxatDrawerWithHighlightMenuComponent,
    ExxatDrawerWithHighlightMenuContainerComponent,
    NavbarComponent,
    ExxatDrawerDisableFormComponent,
    drawerWithWizardComponent,
  ],
  imports: [
    CommonModule,
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
    DragDropModule,
    LayoutModule,
    FuseDirectivesModule,
    MatDialogModule,
    FuseThemeOptionsModule,
    CKEditorModule,
    FileUploadModule,
  ],
  providers: [ExxatDrawerFormService, SidebarFocusHelper],
})
export class UIExxatDrawersModule {}
