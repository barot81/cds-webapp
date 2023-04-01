import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@zhealthcare/plugin/ckeditor';
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
} from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { SidebarFocusHelper } from '../zhealthcare-sidebar/zhealthcare-sidebar.service';
import { DialogBoxComponent } from './examples/dialog-box/dialog-box.component';
import { DrawerFiltersDemoComponent } from './examples/drawer-filters-demo/drawer-filters-demo/drawer-filters-demo.component';
import { DrawerFilterExampleOneComponent } from './examples/drawer-filters-demo/drawers/drawer-filter-example-one/drawer-filter-example-one.component';
import { DrawerWithCardsContainerComponent } from './examples/drawer-with-cards-container/drawer-with-cards-container.component';
import { DrawerWithCardsComponent } from './examples/drawer-with-cards-container/drawer/drawer-with-cards/drawer-with-cards.component';
import { DrawerWithStickyButtonsContainerComponent } from './examples/drawer-with-sticky-buttons-container/drawer-with-sticky-buttons-container.component';
import { DrawerWithStickyButtonsComponent } from './examples/drawer-with-sticky-buttons/drawer-with-sticky-buttons.component';
import { drawerWithWizardComponent } from './examples/drawer-with-wizard/drawer-with-wizard.component';
import { zhealthcareDrawerDisableFormComponent } from './examples/zhealthcare-drawer-disable-form/zhealthcare-drawer-disable-form.component';
import { zhealthcareDrawerFormExamplesComponent } from './examples/zhealthcare-drawer-form-examples/zhealthcare-drawer-form-examples.component';
import { zhealthcareDrawerReactiveFormComponent } from './examples/zhealthcare-drawer-reactive-form/zhealthcare-drawer-reactive-form.component';
import { zhealthcareDrawerWithDragDropComponent } from './examples/zhealthcare-drawer-with-drag-drop/zhealthcare-drawer-with-drag-drop.component';
import { zhealthcareDrawerWithHighlightMenuContainerComponent } from './examples/zhealthcare-drawer-with-highlight-menu-container/zhealthcare-drawer-with-highlight-menu-container.component';
import { zhealthcareDrawerWithHighlightMenuComponent } from './examples/zhealthcare-drawer-with-highlight-menu/zhealthcare-drawer-with-highlight-menu.component';
import { zhealthcareDrawersSizesComponent } from './examples/zhealthcare-drawers-sizes/zhealthcare-drawers-sizes.component';
import { zhealthcareMultiDrawerContainerComponent } from './examples/zhealthcare-multi-drawer-container/zhealthcare-multi-drawer-container.component';
import { zhealthcareMultiDrawerComponent } from './examples/zhealthcare-multi-drawer/zhealthcare-multi-drawer.component';
import { DrawerColumnsComponent } from './examples/zhealthcare-two-column-drawer/drawer-columns/drawer-columns.component';
import { zhealthcareTwoColumnDrawerComponent } from './examples/zhealthcare-two-column-drawer/zhealthcare-two-column-drawer.component';
import { zhealthcareDrawerFormService } from './zhealthcare-drawer-forms-shared.service';
import { zhealthcareDrawersComponent } from './zhealthcare-drawers.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'zhealthcare-drawers',
    component: zhealthcareDrawersComponent,
    canDeactivate: [BackNavigationGuard],
    children: [
      {
        path: '',
        redirectTo: 'drawer-sizes',
        pathMatch: 'full',
      },
      {
        path: 'drawer-sizes',
        component: zhealthcareDrawersSizesComponent,
        canDeactivate: [BackNavigationGuard],
      },
      {
        path: 'multi-drawer',
        component: zhealthcareMultiDrawerContainerComponent,
        canDeactivate: [BackNavigationGuard],
      },
      {
        path: 'drawer-with-cards',
        component: DrawerWithCardsContainerComponent,
        canDeactivate: [BackNavigationGuard],
      },

      {
        path: 'drawer-with-drag-drop',
        component: zhealthcareDrawerWithDragDropComponent,
        canDeactivate: [BackNavigationGuard],
      },
      {
        path: 'drawer-with-two-column',
        component: zhealthcareTwoColumnDrawerComponent,
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
        component: zhealthcareDrawerWithHighlightMenuContainerComponent,
        canDeactivate: [BackNavigationGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    zhealthcareDrawersComponent,
    zhealthcareDrawersSizesComponent,
    zhealthcareDrawerReactiveFormComponent,
    DrawerWithStickyButtonsContainerComponent,
    DrawerWithStickyButtonsComponent,
    zhealthcareDrawerFormExamplesComponent,
    zhealthcareDrawerWithDragDropComponent,
    zhealthcareTwoColumnDrawerComponent,
    DrawerColumnsComponent,
    DialogBoxComponent,
    DrawerFiltersDemoComponent,
    DrawerFilterExampleOneComponent,
    DrawerWithCardsContainerComponent,
    DrawerWithCardsComponent,
    zhealthcareMultiDrawerComponent,
    zhealthcareMultiDrawerContainerComponent,
    zhealthcareDrawerWithHighlightMenuComponent,
    zhealthcareDrawerWithHighlightMenuContainerComponent,
    NavbarComponent,
    zhealthcareDrawerDisableFormComponent,
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
  providers: [zhealthcareDrawerFormService, SidebarFocusHelper],
})
export class UIzhealthcareDrawersModule {}
