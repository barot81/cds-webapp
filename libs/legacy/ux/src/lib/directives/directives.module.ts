import { NgModule } from '@angular/core';

import { FocusDirective } from './accessibility/focus.directive';
import { ExpandableCellDirective } from './expandable-cell/expandable-cell.directive';
import { zhealthcareDrawerActionDirective } from './zhealthcare-sidebar-action/zhealthcare-drawer-action.directive';
import { zhealthcareManifoldPanelActionDirective } from './zhealthcare-sidebar-action/zhealthcare-manifold-panel-action.directive';
import { FontColorDirective } from './font-color/font-color.directive';
import { FuseIfOnDomDirective } from './fuse-if-on-dom/fuse-if-on-dom.directive';
import { FuseInnerScrollDirective } from './fuse-inner-scroll/fuse-inner-scroll.directive';
import {
  FuseMatSidenavHelperDirective,
  FuseMatSidenavTogglerDirective,
} from './fuse-mat-sidenav/fuse-mat-sidenav.directive';
import { FusePerfectScrollbarDirective } from './fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { HighLightNavMenuContentDirective } from './high-light-nav-menu/high-light-nav-menu-cotent.directive';
import { NavMenuListDirective } from './high-light-nav-menu/nav-menu-list.directive';
import { NoWhitespaceDirective } from './no-whitespace/no-whitespace.directive';
import { PaginationDirective } from './pagination/pagination.directive';
import { ResizableDirective } from './resizable/resizable.directive';
import { ScrollSpyModule } from './scroll-spy';
import {
  ScrollableListContentDirective,
  ScrollbleListMenuDirective,
} from './scrollable-list';
import { SearchDirective } from './search';

@NgModule({
  declarations: [
    FuseIfOnDomDirective,
    FuseInnerScrollDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePerfectScrollbarDirective,
    zhealthcareDrawerActionDirective,
    zhealthcareManifoldPanelActionDirective,
    NoWhitespaceDirective,
    FocusDirective,
    NavMenuListDirective,
    HighLightNavMenuContentDirective,
    ResizableDirective,
    FontColorDirective,
    ExpandableCellDirective,
    SearchDirective,
    ScrollbleListMenuDirective,
    ScrollableListContentDirective,
    PaginationDirective,
  ],
  imports: [ScrollSpyModule],
  exports: [
    ScrollSpyModule,
    FuseIfOnDomDirective,
    FuseInnerScrollDirective,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePerfectScrollbarDirective,
    zhealthcareDrawerActionDirective,
    zhealthcareManifoldPanelActionDirective,
    NoWhitespaceDirective,
    FocusDirective,
    NavMenuListDirective,
    HighLightNavMenuContentDirective,
    ResizableDirective,
    FontColorDirective,
    ExpandableCellDirective,
    SearchDirective,
    ScrollbleListMenuDirective,
    ScrollableListContentDirective,
    PaginationDirective,
  ],
})
export class FuseDirectivesModule {}
