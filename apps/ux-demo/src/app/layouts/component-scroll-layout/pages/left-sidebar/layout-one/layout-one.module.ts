import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { LayoutOneRoutingModule } from './layout-one-routing.module';
import { LayoutOneContainerComponent } from './container/layout-one-container.component';
import { LayoutNavBarComponent } from './layout-one-nav-bar/layout-one-nav-bar.component';
import { LAYOUTONETABS } from './tabs';
import { DemoSidebarModule, StudentDemoContentModule, DemoCondensedGridModule, StudentProfileDemoHeaderContentModule, DemoTableModule, DemoFullScrollTableModule } from '../../../components';


@NgModule({
    declarations: [LayoutOneContainerComponent, LayoutNavBarComponent, ...LAYOUTONETABS],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FuseSidebarModule,
        FuseSharedModule,
        MaterialModule,
        LayoutOneRoutingModule,
        DemoSidebarModule,
        StudentDemoContentModule,
        StudentProfileDemoHeaderContentModule,
        DemoTableModule,
        DemoFullScrollTableModule,
        DemoCondensedGridModule
    ],
})
export class LayoutOneModule {

}