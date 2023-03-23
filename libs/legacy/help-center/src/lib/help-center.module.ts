import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploadModule } from '@exxat/plugin/file-upload';
import { FuseDirectivesModule, MaterialModule } from '@exxat/ux';

import { CKEditorModule } from "@exxat/plugin/ckeditor";
import { HelpCenterFileuploadComponent } from "./components/file-upload/file-upload.component";
import { ReplyTicketComponent } from "./components/reply/reply-ticket.component";
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { HelpCenterPopupComponent } from './help-center-popup.component';
import { HelpCenterRoutingModule } from './help-center-routing.module';
import { HelpCenterDrawerService } from './services/help-center-drawer.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FileUploadModule,
    CKEditorModule,
    HelpCenterRoutingModule,
    FuseDirectivesModule,
  ],
  providers: [HelpCenterDrawerService],
  declarations: [HelpCenterPopupComponent, HelpCenterFileuploadComponent,
    TicketDetailsComponent, ReplyTicketComponent],
  exports: [],
})
export class HelpCenterModule {}
