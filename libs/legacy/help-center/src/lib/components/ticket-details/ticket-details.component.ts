import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ZendeskAPIClient } from '@zhealthcare/zendesk';
import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';
import { FusionFormComponent } from '@zhealthcare/fusion/components';
import { EventItem, EventsService } from '@zhealthcare/fusion/core';
import {
  FuseProgressBarService,
  ManifoldPanel,
  ManifoldPanelService,
  SpinnerOverlayService
} from '@zhealthcare/ux';
import moment from 'moment';
import { HelpCenterDrawerService } from '../../services/help-center-drawer.service';

@Component({
  selector: 'v4-app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent
  extends FusionFormComponent
  implements OnInit, OnDestroy
{
  _helpCenterDrawerService: HelpCenterDrawerService;
  override data: any;
  commentsGroupedByDate: any = undefined;
  spinnerOverlayService: SpinnerOverlayService;
  config: any;
  message = '';
  requestId: any;
  private _http: HttpClient;
  prismChatURL: string;

  constructor(
    _http: HttpClient,
    spinnerOverlayService: SpinnerOverlayService,
    private _fuseProgressService: FuseProgressBarService,
    private helpCenterDrawerService: HelpCenterDrawerService,
    private _manifoldPanelService: ManifoldPanelService,
    private _eventService: EventsService,
    private _runtimeConfigLoaderService: RuntimeConfigLoaderService,
    private _zendesAPIClient: ZendeskAPIClient
  ) {
    super();
    this.prismChatURL =
      _runtimeConfigLoaderService.getConfig().appSettings.services.prismChatURL.endpoint;
    this._helpCenterDrawerService = helpCenterDrawerService;
    this._http = _http;
    this.spinnerOverlayService = spinnerOverlayService;
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  ngOnInit() {
    if (this.data) {
      this.requestId = this.data.requestId;
      this.getTicketDetails(this.data.requestId);
    }
    this._eventService.subscribe('onReplyDrawerClose', (event: EventItem) => {
      this.getTicketDetails(event.payload.ticketId);
    });
  }

  getTicketDetails(ticketId: number) {
    const headers = this.data.apiHeader;
    this._zendesAPIClient
      .getRequestComments(ticketId)
      .subscribe((response: any) => {
        console.log('ticket List By User === ', response);
        const userMap = this.getUserMapping(response.users);
        const commentsGroupedByDate = this.groupByDate(
          response.comments,
          userMap
        );
        console.log(commentsGroupedByDate);
        this.commentsGroupedByDate =
          commentsGroupedByDate && commentsGroupedByDate.length > 0
            ? commentsGroupedByDate.reverse()
            : [];
        this.spinnerOverlayService.hide();
      });
  }

  getUserMapping(
    userObject: Array<{ id: number; name: string }>
  ): Map<number, string> {
    const userMap = new Map();
    userObject.map((user) => {
      userMap.set(user.id, user.name);
    });
    return userMap;
  }

  groupByDate(response: any, userObject: Map<number, string>) {
    const results: Array<{
      date: string;
      messageArray: Array<{
        from: string;
        message: string;
        attachments: Array<string>;
        dateAndTime: string;
      }>;
    }> = [];
    let currentDate: null | string = null;
    let currentGroupedMessage:
      | {
          date: string;
          messageArray: Array<{
            from: string;
            message: string;
            attachments: Array<string>;
            dateAndTime: string;
          }>;
        }
      | Record<string, never> = {};
    response.forEach((message: any) => {
      const messageDate = moment(message.created_at).format('MMMM Do YYYY');
      const dateAndTime = moment(message.created_at).format(
        'MMMM Do YYYY, h:mm:ss a'
      );
      const messageObject = {
        from: String(userObject.get(message.author_id)),
        message: message.body,
        attachments: [...message.attachments],
        dateAndTime: dateAndTime,
      };
      if (
        results.length === 0 ||
        (currentDate !== null && currentDate !== messageDate)
      ) {
        currentDate = messageDate;
        currentGroupedMessage = {
          date: messageDate,
          messageArray: [],
        };
        currentGroupedMessage.messageArray.push(messageObject);
        results.push(currentGroupedMessage);
      } else {
        currentGroupedMessage.messageArray.push(messageObject);
      }
    });
    return results;
  }

  primaryAction() {
    const componentSelector = this._helpCenterDrawerService.get('ticket-reply');

    this._manifoldPanelService.setManifoldPanelInputs(
      new ManifoldPanel(
        componentSelector,
        undefined,
        'Reply',
        'drawer-md',
        this.data,
        undefined,
        'Submit',
        undefined,
        true
      ),
      undefined
    );
    this._manifoldPanelService.openPanel(componentSelector);
    this._fuseProgressService.hide();
  }
}
