import { NgModule } from '@angular/core';

import { MatStepperModule } from '@angular/material/stepper';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';
import { zhealthcareCalendarModule, MaterialModule } from '@zhealthcare/ux';
import { zhealthcareAppsRepoModule } from '../zhealthcare-apps-repo/zhealthcare-apps-repo.module';
import { zhealthcareGridGuidelinesModule } from '../zhealthcare-grid-guidelines';
import { zhealthcareUxRepoModule } from '../zhealthcare-ux-repo/zhealthcare-ux-repo.module';
import { ComponentScrollLayoutModule } from '../layouts';
import { ChipsDemoModule } from './chips-demo/chips-demo.module';
import { CkEditorDemoModule } from './ck-editor-demo/ck-editor-demo.module';
import { UIColorsModule } from './colors/colors.module';
import { ComponentScrollDocModule } from './component-scroll-doc/component-scroll-doc.module';
import { DataSourceDemoModule } from './data-source/data-source.module';
import { DragAndDropModule } from './drag-and-drop';
import { DynamicOverlayDemoModule } from './dynamic-overlay-demo';
import { zhealthcareAccessibilityModule } from './zhealthcare-accessibility/zhealthcare-accessibility.module';
import { UIzhealthcareButtonsModule } from './zhealthcare-buttons/zhealthcare-buttons.module';
import { zhealthcareCardsModule } from './zhealthcare-cards/zhealthcare-cards.module';
import { zhealthcareCarouselDemoModule } from './zhealthcare-carousel-demo';
import { UIzhealthcareDrawersModule } from './zhealthcare-drawers/zhealthcare-drawers.module';
import { zhealthcareGraphsStandardModule } from './zhealthcare-graphs-standard';
import { zhealthcareGridsModule } from './zhealthcare-grids/zhealthcare-grids.module';
import { zhealthcareOverlayDemoModule } from './zhealthcare-overlay-demo/zhealthcare-overlay-demo.module';
import { zhealthcareSidebarModule } from './zhealthcare-sidebar/zhealthcare-sidebar.module';
import { zhealthcareTooltipDemoModule } from './zhealthcare-tooltip-demo/zhealthcare-tooltip-demo.module';
import { zhealthcareUiComponentsModule } from './zhealthcare-ui-components/zhealthcare-ui-components.module';
import { SnackbarDemoModule } from './zhealthcare-ui-components/tabs/snackbar-demo/snackbar-demo.module';
import { zhealthcareWizardsModule } from './zhealthcare-wizards/zhealthcare-wizards.module';
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
    UIzhealthcareDrawersModule,
    UIzhealthcareButtonsModule,
    zhealthcareUiComponentsModule,
    DataSourceDemoModule,
    zhealthcareCardsModule,
    zhealthcareWizardsModule,
    MatStepperModule,
    FormControlsModule,
    MaterialModule,
    NavigationModule,
    zhealthcareGridsModule,
    FileViewerdocModule,
    FontAwesomeModule,
    zhealthcareOverlayDemoModule,
    zhealthcareTooltipDemoModule,
    SearchBarExamplesModule,
    zhealthcareAccessibilityModule,
    HighLightNavMenuItemModule,
    UxProcessModule,
    SideNavDemoModule,
    ChipsDemoModule,
    zhealthcareUxRepoModule,
    zhealthcareAppsRepoModule,
    zhealthcareGridGuidelinesModule,
    ResizableDemoModule,
    SnackbarDemoModule,
    TooltipDemoModule,
    RangeSliderDemoModule,
    ScrollSpyDemoModule,
    NgxChartDemoModule,
    VerticalStepperDemoDemoModule,
    ComponentScrollLayoutModule,
    zhealthcareGraphsStandardModule,
    ComponentScrollDocModule,
    CkEditorDemoModule,
    zhealthcareCarouselDemoModule,
    MessageBoxesModule,
    InfoBoxesModule,
    zhealthcareSidebarModule,
    zhealthcareTagModule,
    DragAndDropModule,
    FilterExampleModule,
    ScrollableFormModule,
    zhealthcareCalendarModule,
    DynamicOverlayDemoModule,
  ],
})
export class UIModule {}
