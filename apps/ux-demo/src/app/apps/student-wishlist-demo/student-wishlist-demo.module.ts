import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentWishlistDemoRoutingModule } from './student-wishlist-demo-routing.module';
import { StudentWishlistDemoComponent } from './student-wishlist-demo.component';
import { zhealthcareTooltipModule, FuseSharedModule, FuseSidebarModule, MaterialModule } from '@zhealthcare/ux';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ExploreSitesDemoPageComponent } from './explore-sites-demo-page/explore-sites-demo-page.component';

@NgModule({
  declarations: [StudentWishlistDemoComponent, ExploreSitesDemoPageComponent],
  imports: [
    CommonModule,
    StudentWishlistDemoRoutingModule,
    FuseSharedModule,
    FuseSidebarModule,
    MaterialModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    zhealthcareTooltipModule 
  ]
})
export class StudentWishlistDemoModule { }
