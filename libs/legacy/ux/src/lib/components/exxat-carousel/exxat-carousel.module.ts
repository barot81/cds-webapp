import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExxatCarouselComponent } from './component/exxat-carousel.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ExxatCarouselComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule],
  exports: [ExxatCarouselComponent],
})
export class ExxatCarouselModule {}
