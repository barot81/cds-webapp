import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  ExxatAvatarModule,
  ExxatCarouselModule,
  FuseThemeOptionsModule,
  MaterialModule,
} from '@exxat/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { ExxatCarouselDemoContainerComponent } from './container/exxat-carousel-demo-container.component';
import { ExxatCarouselDemoRoutingModule } from './exxat-carousel-demo-routing.module';

@NgModule({
  declarations: [ExxatCarouselDemoContainerComponent],
  imports: [
    ExxatCarouselDemoRoutingModule,
    FlexLayoutModule,
    CommonModule,
    ExxatCarouselModule,
    ExxatAvatarModule,
    MaterialModule,
    FuseHighlightModule,
    FuseThemeOptionsModule,
  ],
})
export class ExxatCarouselDemoModule {}
