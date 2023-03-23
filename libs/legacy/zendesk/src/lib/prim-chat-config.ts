import { Injectable } from '@angular/core';
import { NgxZendeskWebwidgetConfig } from 'ngx-zendesk-webwidget';
@Injectable({
  providedIn: 'any',
})
export class PrimChatConfig extends NgxZendeskWebwidgetConfig {
  accountUrl = 'exxat.zendesk.com';
  callback(zE: any) {}
}
