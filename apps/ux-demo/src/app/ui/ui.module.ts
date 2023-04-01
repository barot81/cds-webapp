import { NgModule } from '@angular/core';

import { MatStepperModule } from '@angular/material/stepper';
import { ExxatTagModule } from '@exxat/plugin/tags';
import { ExxatCalendarModule, MaterialModule } from '@exxat/ux';
import { ExxatAppsRepoModule } from '../exxat-apps-repo/exxat-apps-repo.module';
import { ExxatGridGuidelinesModule } from '../exxat-grid-guidelines';
import { ExxatUxRepoModule } from '../exxat-ux-repo/exxat-ux-repo.module';
import { ComponentScrollLayoutModule } from '../layouts';
import { ChipsDemoModule } from './chips-demo/chips-demo.module';
import { CkEditorDemoModule } from './ck-editor-demo/ck-editor-demo.module';
import { UIColorsModule } from './colors/colors.module';
import { ComponentScrollDocModule } from './component-scroll-doc/component-scroll-doc.module';
import { DataSourceDemoModule } from './data-source/data-source.module';
import { DragAndDropModule } from './drag-and-drop';
import { DynamicOverlayDemoModule } from './dynamic-overlay-demo';
import { ExxatAccessibilityModule } from './exxat-accessibility/exxat-accessibility.module';
import { UIExxatButtonsModule } from './exxat-buttons/exxat-buttons.module';
import { ExxatCardsModule } from './exxat-cards/exxat-cards.module';
import { ExxatCarouselDemoModule } from './exxat-carousel-demo';
import { UIExxatDrawersModule } from './exxat-drawers/exxat-drawers.module';
import { ExxatGraphsStandardModule } from './exxat-graphs-standard';
import { ExxatGridsModule } from './exxat-grids/exxat-grids.module';
import { ExxatOverlayDemoModule } from './exxat-overlay-demo/exxat-overlay-demo.module';
import { ExxatSidebarModule } from './exxat-sidebar/exxat-sidebar.module';
import { ExxatTooltipDemoModule } from './exxat-tooltip-demo/exxat-tooltip-demo.module';
import { ExxatUiComponentsModule } from './exxat-ui-components/exxat-ui-components.module';
import { SnackbarDemoModule } from './exxat-ui-components/tabs/snackbar-demo/snackbar-demo.module';
import { ExxatWizardsModule } from './exxat-wizards/exxat-wizards.module';
import { FileViewerdocModule } from './file-viewer/file-viewer.module';
import { FilterExampleModule } from './filter-example';
import { FontAwesomeModule } from './font-awesome/font-awesome.module';
import { FormControlsModule } from './form-controls/form-controls.module';
import { UIHelperClassesModule } from './helper-classes/helper-classes.module';
import { HighLightNavMenuItemModule } from './high-light-nav-menu-item/high-light-nav-menu-item.module';
import { UIIconsModule } from './icons/icons.module';
import { InfoBoxesModule } from './info-boxes';
import { MessageBoxesModule } from './message-boxes';
import { NavigationModule } from './navigation/navigation.module';
import { NgxChartDemoModule } from './ngx-chart-demo/ngx-chart-demo.module';
import { UIPageLayoutsModule } from './page-layouts/page-layouts.module';
import { RangeSliderDemoModule } from './range-slider-demo/range-slider-demo.module';
import { ResizableDemoModule } from './resizable-demo/resizable-demo.module';
import { ScrollSpyDemoModule } from './scroll-spy-demo/scroll-spy-demo.module';
import { ScrollableFormModule } from './scrollable-form';
import { SearchBarExamplesModule } from './search-bar-examples/search-bar-examples.module';
import { SideNavDemoModule } from './side-nav-demo/side-nav-demo.module';
import { TooltipDemoModule } from './tooltip-demo/tooltip-demo.module';
import { UITypographyModule } from './typography/typography.module';
import { UxProcessModule } from './ux-process/ux-process.module';
import { VerticalStepperDemoDemoModule } from './vertical-stepper-demo';

@NgModule({
  imports: [
    UIIconsModule,
    UITypographyModule,
    UIHelperClassesModule,
    UIPageLayoutsModule,
    UIColorsModule,
    UIExxatDrawersModule,
    UIExxatButtonsModule,
    ExxatUiComponentsModule,
    DataSourceDemoModule,
    ExxatCardsModule,
    ExxatWizardsModule,
    MatStepperModule,
    FormControlsModule,
    MaterialModule,
    NavigationModule,
    ExxatGridsModule,
    FileViewerdocModule,
    FontAwesomeModule,
    ExxatOverlayDemoModule,
    ExxatTooltipDemoModule,
    SearchBarExamplesModule,
    ExxatAccessibilityModule,
    HighLightNavMenuItemModule,
    UxProcessModule,
    SideNavDemoModule,
    ChipsDemoModule,
    ExxatUxRepoModule,
    ExxatAppsRepoModule,
    ExxatGridGuidelinesModule,
    ResizableDemoModule,
    SnackbarDemoModule,
    TooltipDemoModule,
    RangeSliderDemoModule,
    ScrollSpyDemoModule,
    NgxChartDemoModule,
    VerticalStepperDemoDemoModule,
    ComponentScrollLayoutModule,
    ExxatGraphsStandardModule,
    ComponentScrollDocModule,
    CkEditorDemoModule,
    ExxatCarouselDemoModule,
    MessageBoxesModule,
    InfoBoxesModule,
    ExxatSidebarModule,
    ExxatTagModule,
    DragAndDropModule,
    FilterExampleModule,
    ScrollableFormModule,
    ExxatCalendarModule,
    DynamicOverlayDemoModule,
  ],
})
export class UIModule {}
