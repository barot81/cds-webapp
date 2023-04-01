import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseThemeOptionsModule, MaterialModule } from '@exxat/ux';
import { MessageBoxesRoutingModule } from './message-boxes-routing.module';
import { MessageBoxesComponent } from './pages/message-boxes.component';
import { FuseHighlightModule } from '../../helpers/highlight/highlight.module';

@NgModule({
  declarations: [MessageBoxesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FuseHighlightModule,
    MaterialModule,
    MessageBoxesRoutingModule,
    FuseThemeOptionsModule
  ],
})
export class MessageBoxesModule {}
