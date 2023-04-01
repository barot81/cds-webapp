import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  zhealthcareAvatarModule,
  zhealthcareCarouselModule,
  FuseThemeOptionsModule,
  MaterialModule,
} from '@zhealthcare/ux';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';
import { zhealthcareCarouselDemoContainerComponent } from './container/zhealthcare-carousel-demo-container.component';
import { zhealthcareCarouselDemoRoutingModule } from './zhealthcare-carousel-demo-routing.module';

@NgModule({
  declarations: [zhealthcareCarouselDemoContainerComponent],
  imports: [
    zhealthcareCarouselDemoRoutingModule,
    FlexLayoutModule,
    CommonModule,
    zhealthcareCarouselModule,
    zhealthcareAvatarModule,
    MaterialModule,
    FuseHighlightModule,
    FuseThemeOptionsModule,
  ],
})
export class zhealthcareCarouselDemoModule {}
