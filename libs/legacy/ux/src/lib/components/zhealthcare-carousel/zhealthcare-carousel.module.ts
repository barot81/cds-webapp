import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { zhealthcareCarouselComponent } from './component/zhealthcare-carousel.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [zhealthcareCarouselComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule],
  exports: [zhealthcareCarouselComponent],
})
export class zhealthcareCarouselModule {}
