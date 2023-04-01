import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasonryLayoutRoutingModule } from './masonry-layout-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule, MaterialModule } from '@exxat/ux';
import { MasonryLayoutComponent } from './masonry-layout/masonry-layout.component';


@NgModule({
    declarations: [MasonryLayoutComponent],
    imports: [
        CommonModule,
        MasonryLayoutRoutingModule,
        CommonModule,
        FlexLayoutModule,
        FuseSharedModule,
        MaterialModule,
    ],
})
export class MasonryLayoutModule {

}