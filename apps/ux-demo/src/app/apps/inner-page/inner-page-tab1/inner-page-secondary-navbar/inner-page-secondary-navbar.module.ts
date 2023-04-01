import { NgModule } from '@angular/core';
import { InnerPageSecondaryNavbarComponent } from './inner-page-secondary-navbar.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, FuseSharedModule } from '@exxat/ux';
import { RouterModule } from '@angular/router';
import { PageDemoRoutingModule } from '../page-demo/page-demo-routing.module';

@NgModule({
    declarations: [InnerPageSecondaryNavbarComponent],
    imports: [CommonModule,
        FlexLayoutModule,
        MaterialModule,
        FuseSharedModule,
        RouterModule,
        PageDemoRoutingModule
    ],
    exports: [InnerPageSecondaryNavbarComponent]
})
export class InnerPageSecondarNavBarModule {

}
