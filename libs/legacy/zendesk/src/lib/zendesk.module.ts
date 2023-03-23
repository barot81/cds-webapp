import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxZendeskWebwidgetModule } from 'ngx-zendesk-webwidget';
import { PrimChatConfig } from './prim-chat-config';
import { ZendeskAPIClient } from './services/zendesk.APIClient';
import { ZendeskService } from './services/zendesk.service';
@NgModule({
  imports: [CommonModule, NgxZendeskWebwidgetModule.forRoot(PrimChatConfig)],
  providers: [ZendeskService, ZendeskAPIClient],
})
export class ZendeskModule {}
