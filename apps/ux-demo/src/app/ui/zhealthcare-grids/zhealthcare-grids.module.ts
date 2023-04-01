import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule, Routes } from '@angular/router';
import { DataSourceModule } from '@zhealthcare/plugin/data-source';
import { zhealthcareTagModule } from '@zhealthcare/plugin/tags';
import {
  zhealthcareAvatarListItemModule, zhealthcareAvatarModule,
  zhealthcareTooltipModule, FlexTableModule, FuseDirectivesModule, FuseModule, FusePipesModule, FuseSharedModule, FuseSidebarModule, FuseThemeOptionsModule, LayoutModule, MaterialModule, ShowMoreModule
} from '@zhealthcare/ux';
import { GridService } from '../../apps/student-grid/grid.service';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { UXDemoDrawerService } from '../../remote-entry/ux-demo-drawer.service';
import { AutoScrollGridComponent } from './examples/auto-scroll-grid/auto-scroll-grid.component';
import { ColorShadesGridComponent } from './examples/color-shades-grid/color-shades-grid.component';
import { CondensedGridComponent } from './examples/condensed-grid/condensed-grid.component';
import { ExpandableCellGridComponent } from './examples/expandable-cell-grid/expandable-cell-grid.component';
import { ExpandableGridExampleComponent } from './examples/expandable-grid-example/expandable-grid-example.component';
import { zhealthcareGridsExample1Component } from './examples/zhealthcare-grids-example1/zhealthcare-grids-example1.component';
import { zhealthcareSiteDemoGridComponent } from './examples/zhealthcare-site-demo-grid/zhealthcare-site-demo-grid.component';
import { GridNavBarListComponent } from './examples/grid-nav-bar-list/grid-nav-bar-list.component';
import { GridWithTwoHeaderRowsComponent } from './examples/grid-with-two-header-rows/grid-with-two-header-rows.component';
import { HeaderHoverGridComponent } from './examples/header-hover-grid/header-hover-grid.component';
import {
  ContainerComponent, ContentHeaderComponent, LayoutScrollGridComponent, LayoutScrollService, MainHeaderComponent,
  SidebarComponent,
  TabnavBarComponent
} from './examples/layout-scroll-grid';
import { MultiRowGridExampleComponent } from './examples/multi-row-grid-example/multi-row-grid-example.component';
import { NewGridGuidelinesComponent } from './examples/new-grid-guidelines/new-grid-guidelines.component';
import { ComponentScrollWithoutSidebarComponent } from './examples/new-grid-guidelines/wihtout-left-side-bar/component-scroll/component-scroll.component';
import { FullPageScrollWithoutSidebarComponent } from './examples/new-grid-guidelines/wihtout-left-side-bar/full-page-scroll/full-page-scroll.component';
import { ComponentScrollWithSidebarComponent } from './examples/new-grid-guidelines/with-left-sidebar/component-scroll/component-scroll.component';
import { FullPageScrollWithSidebarComponent } from './examples/new-grid-guidelines/with-left-sidebar/full-page-scroll/full-page-scroll.component';
import { NoSearchGridComponent } from './examples/no-search-grid/no-search-grid.component';
import { NotificationHistoryGridComponent } from './examples/notification-history-grid/notification-history-grid.component';
import { OnclickArrowExpandCollapseGridComponent } from './examples/onclick-arrow-expand-collapse-grid/onclick-arrow-expand-collapse-grid.component';
import { AdaptiveGridExampleComponenent } from './examples/responsive-grid/adaptive-grid.component';
import { ScrollableGridExampleComponent } from './examples/scrollable-grid-example/scrollable-grid-example.component';
import {
  TabNavBarComponenent,
  WithoutStickyHeaderPopupComponent,
  WithStickyHeaderPopupComponent
} from './examples/search-bar-grids/components';
import { SearchBarGridsContainerComponenent } from './examples/search-bar-grids/container/container.component';
import { WithStickyHeaderGridComponenent } from './examples/search-bar-grids/pages/with-sticky-header/with-sticky-header.component';
import { WithoutStickyHeaderGridComponenent } from './examples/search-bar-grids/pages/without-sticky-header/without-sticky-header.component';
import { SecondaryGridDemoComponent } from './examples/secondary-grid-demo/secondary-grid-demo.component';
import { SecondaryGridComponent } from './examples/secondary-grid/secondary-grid.component';
import { SimpleGridHeaderComponent } from './examples/simple-grid-header/simple-grid-header.component';
import { SimpleGridComponent } from './examples/simple-grid/simple-grid.component';
import { StickyColumnGridExampleComponent } from './examples/sticky-column-grid/sticky-column-grid-example/sticky-column-grid-example.component';
import { StickyColumnGridHeaderComponent } from './examples/sticky-column-grid/sticky-column-grid-header/sticky-column-grid-header.component';
import { StickyColumnGridComponent } from './examples/sticky-column-grid/sticky-column-grid.component';
import { TableWithColspanComponent } from './examples/table-with-colspan/table-with-colspan.component';
import { TableWithShowMoreComponent } from './examples/table-with-show-more/table-with-show-more.component';
import { zhealthcareGridsComponent } from './zhealthcare-grids.component';


const routes: Routes = [
  {
    path: 'zhealthcare-grids',
    component: zhealthcareGridsComponent
  },
  {
    path: 'search-bar-grids',
    component: SearchBarGridsContainerComponenent,
    children: [
      {
        path: '',
        redirectTo: 'with-sticky-header',
        pathMatch: 'full'
      },
      {
        path: 'with-sticky-header',
        component: WithStickyHeaderGridComponenent
      },
      {
        path: 'without-sticky-header',
        component: WithoutStickyHeaderGridComponenent
      }
    ]
  },

  {
    path: 'expandable-grid',
    component: ExpandableGridExampleComponent
  },
  {
    path: 'sticky-column-grid',
    component: StickyColumnGridComponent
  },
  {
    path: 'grid-with-tabs',
    component: zhealthcareSiteDemoGridComponent
  },
  {
    path: 'condensed-grid',
    component: CondensedGridComponent
  },
  {
    path: 'color-shades-grid',
    component: ColorShadesGridComponent
  },
  {
    path: 'sticky-header-grid',
    component: SecondaryGridComponent
  },
  {
    path: 'responsive-grid',
    component: AdaptiveGridExampleComponenent
  },

  {
    path: 'secondary-grid-demo',
    component: SecondaryGridDemoComponent
  },
  {
    path: 'grid-with-two-header-rows',
    component: GridWithTwoHeaderRowsComponent
  },
  {
    path: 'table-with-colspan',
    component: TableWithColspanComponent
  },
  {
    path: 'scrollable-grid',
    component: ScrollableGridExampleComponent
  },
  {
    path: 'header-hover-grid',
    component: HeaderHoverGridComponent
  },
  {
    path: 'auto-scroll-grid',
    component: AutoScrollGridComponent
  },
  {
    path: 'table-with-show-more',
    component: TableWithShowMoreComponent
  },
  {
    path: 'new-grid-guidelines/component-level-scroll-with-left-sidebar',
    component: ComponentScrollWithSidebarComponent
  },
  {
    path: 'new-grid-guidelines/full-page-level-scroll-with-left-sidebar',
    component: FullPageScrollWithSidebarComponent
  },
  {
    path: 'new-grid-guidelines/component-level-scroll-without-left-sidebar',
    component: ComponentScrollWithoutSidebarComponent
  },
  {
    path: 'new-grid-guidelines/full-page-level-scroll-without-left-sidebar',
    component: FullPageScrollWithoutSidebarComponent
  },
  {
    path: 'multi-row-grid',
    component: MultiRowGridExampleComponent
  },
  {
    path: 'expandable-cell-grid',
    component: ExpandableCellGridComponent
  },
  {
    path: 'notification-history-grid',
    component: NotificationHistoryGridComponent
  },
  {
    path: 'onclick-arrow-expand-collapse-grid',
    component: OnclickArrowExpandCollapseGridComponent
  },
  {
    path: 'no-search-grid',
    component: NoSearchGridComponent
  },
  {
    path: 'zhealthcare-layout-scroll',
    component: ContainerComponent
  }
];

@NgModule({
  declarations: [
    zhealthcareGridsComponent,
    zhealthcareGridsExample1Component,
    ExpandableGridExampleComponent,
    StickyColumnGridComponent,
    zhealthcareSiteDemoGridComponent,
    GridNavBarListComponent,
    CondensedGridComponent,
    ColorShadesGridComponent,
    SecondaryGridComponent,
    AdaptiveGridExampleComponenent,
    ScrollableGridExampleComponent,
    HeaderHoverGridComponent,
    AutoScrollGridComponent,
    NewGridGuidelinesComponent,
    ComponentScrollWithSidebarComponent,
    FullPageScrollWithSidebarComponent,
    ComponentScrollWithoutSidebarComponent,
    FullPageScrollWithoutSidebarComponent,
    MultiRowGridExampleComponent,
    ExpandableCellGridComponent,
    GridWithTwoHeaderRowsComponent,
    TableWithColspanComponent,
    NotificationHistoryGridComponent,
    OnclickArrowExpandCollapseGridComponent,
    SecondaryGridDemoComponent,
    NoSearchGridComponent,
    ContainerComponent,
    LayoutScrollGridComponent,
    ContentHeaderComponent,
    MainHeaderComponent,
    SidebarComponent,
    TabnavBarComponent,
    SimpleGridComponent,
    SimpleGridHeaderComponent,
    StickyColumnGridHeaderComponent,
    StickyColumnGridExampleComponent,
    WithStickyHeaderGridComponenent,
    WithoutStickyHeaderGridComponenent,
    TabNavBarComponenent,
    SearchBarGridsContainerComponenent,
    WithoutStickyHeaderPopupComponent,
    WithStickyHeaderPopupComponent,
    TableWithShowMoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    FuseSharedModule,
    FuseHighlightModule,
    zhealthcareAvatarListItemModule,
    zhealthcareAvatarModule,
    LayoutModule,
    FuseModule,
    FuseSidebarModule,
    FlexTableModule,
    MatAutocompleteModule,
    DataSourceModule,
    MatSortModule,
    ShowMoreModule,
    zhealthcareTooltipModule,
    FuseThemeOptionsModule,
    zhealthcareTagModule,
    FuseDirectivesModule,
    FusePipesModule
  ],
  providers: [GridService, UXDemoDrawerService, LayoutScrollService]
})
export class zhealthcareGridsModule {}