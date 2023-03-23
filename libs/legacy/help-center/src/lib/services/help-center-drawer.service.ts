import { Injectable } from '@angular/core';
import { ComponentMap } from '@zhealthcare/fusion/core';
import { TicketDetailsComponent } from '../components/ticket-details/ticket-details.component';
import {ReplyTicketComponent} from "../components/reply/reply-ticket.component";

@Injectable({
  providedIn: 'any',
})
export class HelpCenterDrawerService extends ComponentMap {
  constructor() {
    super();
    this.add('ticket-details', TicketDetailsComponent);
    this.add('ticket-reply', ReplyTicketComponent);
  }
}
