import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule, MaterialModule } from '@zhealthcare/ux';

import { CardedFullWidth1Component } from './carded/full-width-1/full-width-1.component';
import { CardedFullWidth2Component } from './carded/full-width-2/full-width-2.component';
import { CardedFullWidthTabbed1Component } from './carded/full-width-tabbed-1/full-width-tabbed-1.component';
import { CardedFullWidthTabbed2Component } from './carded/full-width-tabbed-2/full-width-tabbed-2.component';
import { CardedLeftSidebar1Component } from './carded/left-sidebar-1/left-sidebar-1.component';
import { CardedLeftSidebar2Component } from './carded/left-sidebar-2/left-sidebar-2.component';
import { CardedLeftSidebarTabbed1Component } from './carded/left-sidebar-tabbed-1/left-sidebar-tabbed-1.component';
import { CardedLeftSidebarTabbed2Component } from './carded/left-sidebar-tabbed-2/left-sidebar-tabbed-2.component';
import { CardedRightSidebar1Component } from './carded/right-sidebar-1/right-sidebar-1.component';
import { CardedRightSidebar2Component } from './carded/right-sidebar-2/right-sidebar-2.component';
import { CardedRightSidebarTabbed1Component } from './carded/right-sidebar-tabbed-1/right-sidebar-tabbed-1.component';
import { CardedRightSidebarTabbed2Component } from './carded/right-sidebar-tabbed-2/right-sidebar-tabbed-2.component';
import { SimpleFullWidth1Component } from './simple/full-width-1/full-width-1.component';
import { SimpleFullWidthTabbed1Component } from './simple/full-width-tabbed-1/full-width-tabbed-1.component';
import { SimpleLeftSidebar1Component } from './simple/left-sidebar-1/left-sidebar-1.component';
import { SimpleLeftSidebar2Component } from './simple/left-sidebar-2/left-sidebar-2.component';
import { SimpleLeftSidebar3Component } from './simple/left-sidebar-3/left-sidebar-3.component';
import { SimpleLeftSidebar4Component } from './simple/left-sidebar-4/left-sidebar-4.component';
import { SimpleRightSidebar1Component } from './simple/right-sidebar-1/right-sidebar-1.component';
import { SimpleRightSidebar2Component } from './simple/right-sidebar-2/right-sidebar-2.component';
import { SimpleRightSidebar3Component } from './simple/right-sidebar-3/right-sidebar-3.component';
import { SimpleRightSidebar4Component } from './simple/right-sidebar-4/right-sidebar-4.component';
import { BlankComponent } from './blank/blank.component';

import { FuseSidebarModule } from '@zhealthcare/ux';
import { FuseDemoModule } from '../../pages/demo/demo.module';
import { CardedCustomWidth1Component } from './carded/custom-width-1/custom-width-1.component';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { ComposeComponent } from './simple/compose/compose.component';
import { LeftSidebarSeparateScrollComponent } from './simple/left-sidebar-2/left-sidebar-separate-scroll/left-sidebar-separate-scroll.component';
import { LeftSidebarSingleScrollComponent } from './simple/left-sidebar-1/left-sidebar-single-scroll/left-sidebar-single-scroll.component';
import { FullWidthComponent } from './simple/full-width-1/full-width/full-width.component';
import { CustomWidthComponent } from './carded/custom-width-1/custom-width/custom-width.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { zhealthcareMasonryComponent } from './carded/zhealthcare-masonry/zhealthcare-masonry.component';
import { LayoutPopComponent } from './carded/left-sidebar-1/layout-popup/layout-popup.component';
import { LayoutPopupComponent } from './carded/left-sidebar-2/layout-popup/layout-popup.component';
import { Template3DialogBoxComponent } from './carded/left-sidebar-tabbed-1/template3-dialog-box/template3-dialog-box.component';
import { Template4DialogBoxComponent } from './carded/left-sidebar-tabbed-2/template4-dialog-box/template4-dialog-box.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Template5DialogBoxComponent } from './carded/right-sidebar-1/template5-dialog-box/template5-dialog-box.component';
import { Template6DialogBoxComponent } from './carded/right-sidebar-2/template6-dialog-box/template6-dialog-box.component';
import { Template7DialogBoxComponent } from './carded/right-sidebar-tabbed-1/template7-dialog-box/template7-dialog-box.component';
import { LayoutUsingTwoFuseSidebarsComponent } from './carded/layout-using-two-fuse-sidebars/layout-using-two-fuse-sidebars.component';
import { Template8DialogBoxComponent } from './carded/layout-using-two-fuse-sidebars/layout-popup/layout-popup.component';
import { FullWidthComponentScrollComponent } from './layouts/containers/fullwidth-component-scroll/fullwidth-component-scroll.component';
import { ContentDemoOneComponent } from './layouts/common/contents/content-demo-one/content-demo-one.component';
import { HeaderDemoOneComponent } from './layouts/common/headers/header-demo-one/header-demo-one.component';
import { FullWidthPageScrollComponent } from './layouts/containers/fullwidth-page-scroll/fullwidth-page-scroll.component';
import { LayoutPopupOneComponent } from './layouts/common/popups/layout-popup-one/layout-popup-one.component';
import { LayoutPopupTwoComponent } from './layouts/common/popups/layout-popup-two/layout-popup-two.component';
import { TwoColumnComponent } from './layouts/containers/two-column/two-column.component';
import { TwoColumnWithHeaderComponent } from './layouts/containers/two-column-with-header/two-column-with-header.component';
import { ThreeColumnWithHeaderComponent } from './layouts/containers/three-column-with-header/three-column-with-header.component';
import { LayoutPopupThreeComponent } from './layouts/common/popups/layout-popup-three/layout-popup-three.component';
import { LayoutPopupFourComponent } from './layouts/common/popups/layout-popup-four/layout-popup-four.component';
import { LayoutPopupFiveComponent } from './layouts/common/popups/layout-popup-five/layout-popup-five.component';
import { FuseSidebarDemoOneComponent } from './layouts/common/fuse-sidebar-demo-one/fuse-sidebar-demo-one.component';
import { TwoSidebarLayoutComponent } from './layouts/containers/two-sidebar-layout/two-sidebar-layout.component';
import { LayoutPopupSixComponent } from './layouts/common/popups/layout-popup-six/layout-popup-six.component';


const routes: Routes = [
  {
    path: 'page-layouts/carded/custom-width-1',
    component: CardedCustomWidth1Component
  },
  {
    path: 'page-layouts/carded/full-width-1',
    component: CardedFullWidth1Component
  },
  {
    path: 'page-layouts/carded/full-width-2',
    component: CardedFullWidth2Component
  },
  {
    path: 'page-layouts/carded/full-width-tabbed-1',
    component: CardedFullWidthTabbed1Component
  },
  {
    path: 'page-layouts/carded/full-width-tabbed-2',
    component: CardedFullWidthTabbed2Component
  },
  {
    path: 'page-layouts/carded/left-sidebar-1',
    component: CardedLeftSidebar1Component
  },
  {
    path: 'page-layouts/carded/left-sidebar-tabbed-1',
    component: CardedLeftSidebarTabbed1Component
  },
  {
    path: 'page-layouts/carded/left-sidebar-2',
    component: CardedLeftSidebar2Component
  },
  {
    path: 'page-layouts/carded/left-sidebar-tabbed-2',
    component: CardedLeftSidebarTabbed2Component
  },
  {
    path: 'page-layouts/carded/right-sidebar-1',
    component: CardedRightSidebar1Component
  },
  {
    path: 'page-layouts/carded/right-sidebar-tabbed-1',
    component: CardedRightSidebarTabbed1Component
  },
  {
    path: 'page-layouts/carded/Layout-using-two-fuse-sidebars',
    component: LayoutUsingTwoFuseSidebarsComponent
  },
  {
    path: 'page-layouts/carded/right-sidebar-2',
    component: CardedRightSidebar2Component
  },
  {
    path: 'page-layouts/carded/right-sidebar-tabbed-2',
    component: CardedRightSidebarTabbed2Component
  },
  {
    path: 'page-layouts/simple/full-width-1',
    component: SimpleFullWidth1Component
  },
  {
    path: 'page-layouts/simple/full-width-tabbed-1',
    component: SimpleFullWidthTabbed1Component
  },
  {
    path: 'page-layouts/simple/left-sidebar-1',
    component: SimpleLeftSidebar1Component
  },
  {
    path: 'page-layouts/simple/left-sidebar-2',
    component: SimpleLeftSidebar2Component
  },
  {
    path: 'page-layouts/simple/left-sidebar-3',
    component: SimpleLeftSidebar3Component
  },
  {
    path: 'page-layouts/simple/left-sidebar-4',
    component: SimpleLeftSidebar4Component
  },
  {
    path: 'page-layouts/simple/right-sidebar-1',
    component: SimpleRightSidebar1Component
  },
  {
    path: 'page-layouts/simple/right-sidebar-2',
    component: SimpleRightSidebar2Component
  },
  {
    path: 'page-layouts/simple/right-sidebar-3',
    component: SimpleRightSidebar3Component
  },
  {
    path: 'page-layouts/simple/right-sidebar-4',
    component: SimpleRightSidebar4Component
  },
  {
    path: 'page-layouts/blank',
    component: BlankComponent
  },
  {
    path: 'page-layouts/zhealthcare-masonry',
    component: zhealthcareMasonryComponent
  },
  {
    path:'page-layouts/layouts/fullwidth-component-scroll',
    component: FullWidthComponentScrollComponent
  },
  {
    path:'page-layouts/layouts/fullwidth-page-scroll',
    component: FullWidthPageScrollComponent
  },
  {
    path:'page-layouts/layouts/two-column',
    component: TwoColumnComponent
  },
  {
    path:'page-layouts/layouts/two-sidebar-layout',
    component: TwoSidebarLayoutComponent
  },
  {
    path:'page-layouts/layouts/two-column-with-header',
    component: TwoColumnWithHeaderComponent
  },
  {
    path:'page-layouts/layouts/three-column-with-header',
    component: ThreeColumnWithHeaderComponent
  },

];

@NgModule({
  declarations: [
    CardedCustomWidth1Component,
    CardedFullWidth1Component,
    CardedFullWidth2Component,
    CardedFullWidthTabbed1Component,
    CardedFullWidthTabbed2Component,
    CardedLeftSidebar1Component,
    CardedLeftSidebar2Component,
    CardedLeftSidebarTabbed1Component,
    CardedLeftSidebarTabbed2Component,
    CardedRightSidebar1Component,
    CardedRightSidebar2Component,
    CardedRightSidebarTabbed1Component,
    CardedRightSidebarTabbed2Component,
    SimpleFullWidth1Component,
    SimpleFullWidthTabbed1Component,
    SimpleLeftSidebar1Component,
    SimpleLeftSidebar2Component,
    SimpleLeftSidebar3Component,
    SimpleLeftSidebar4Component,
    SimpleRightSidebar1Component,
    SimpleRightSidebar2Component,
    SimpleRightSidebar3Component,
    SimpleRightSidebar4Component,
    BlankComponent,
    LeftSidebarSeparateScrollComponent,
    LeftSidebarSingleScrollComponent,
    FullWidthComponent,
    CustomWidthComponent,
    ComposeComponent,
    zhealthcareMasonryComponent,
    LayoutPopupComponent,
    LayoutPopComponent,
    Template3DialogBoxComponent,
    Template4DialogBoxComponent,
    Template5DialogBoxComponent,
    Template6DialogBoxComponent,
    Template7DialogBoxComponent,
    LayoutUsingTwoFuseSidebarsComponent,
    Template8DialogBoxComponent,
    FullWidthComponentScrollComponent,
    FullWidthPageScrollComponent,
    ContentDemoOneComponent,
    HeaderDemoOneComponent,
    LayoutPopupOneComponent,
    LayoutPopupTwoComponent,
    LayoutPopupThreeComponent,
    LayoutPopupSixComponent,
    LayoutPopupFourComponent,
    LayoutPopupFiveComponent,
    TwoColumnComponent,
    FuseSidebarDemoOneComponent,
    TwoColumnWithHeaderComponent,
    ThreeColumnWithHeaderComponent,
    TwoSidebarLayoutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    FuseHighlightModule,
    FuseSidebarModule,
    FuseSharedModule,
    FuseDemoModule,
    MatExpansionModule,
    MatDialogModule
  ]
})
export class UIPageLayoutsModule {
}
