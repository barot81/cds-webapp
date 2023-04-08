import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManifoldPanelService, SpinnerOverlayService } from '@zhealthcare/ux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ZendeskAPIClient } from '@zhealthcare/zendesk';
import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FusionFormAdapter } from '@zhealthcare/fusion/components';
import {
  EventItem,
  EventsService,
  FusionConfigService,
  OrgFacade,
  UserFacade
} from '@zhealthcare/fusion/core';
import lodash from 'lodash';
import { combineLatest, forkJoin, lastValueFrom, Subject } from 'rxjs';

@Component({
  selector: 'v4-app-reply-ticket',
  templateUrl: './reply-ticket.component.html',
  styleUrls: [],
})
export class ReplyTicketComponent
  implements OnInit, OnDestroy, FusionFormAdapter
{
  data: any;
  spinnerOverlayService: SpinnerOverlayService;
  config: any;
  message = '';
  requestId: any;
  unsubscribe$ = new Subject<any>();
  filesList: any;
  public Editor = ClassicEditor;
  private _http: HttpClient;
  prismChatURL: string;

  constructor(
    _http: HttpClient,
    public configService: FusionConfigService,
    spinnerOverlayService: SpinnerOverlayService,
    private _manifoldPanelService: ManifoldPanelService,
    private _eventService: EventsService,
    private _runtimeConfigLoaderService: RuntimeConfigLoaderService,
    private _zendeskAPIClient: ZendeskAPIClient,
    private userFacade: UserFacade,
    private _orgFacade: OrgFacade
  ) {
    this._http = _http;
    this.prismChatURL =
      _runtimeConfigLoaderService.getConfig().appSettings.services.prismChatURL.endpoint;

    this.spinnerOverlayService = spinnerOverlayService;
    this.createConfig();
  }

  ngOnInit() {
    this._manifoldPanelService.managePrimaryActionStyle(true);
    if (this.data) {
      this.requestId = this.data.requestId;
    }
  }

  createConfig() {
    this.config = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'alignment',
          'link',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'fontColor',
          'fontSize',
          '|',
          'outdent',
          'indent',
          '|',
          'blockQuote',
          '|',
          'undo',
          'redo',
        ],
        viewportTopOffset: 30,
        shouldNotGroupWhenFull: false,
      },
      placeholder: 'Reply',
      language: 'en',
      licenseKey: '',
      link: {
        addTargetToExternalLinks: true,
      },
    };
  }

  onChange(event: any) {
    this.message = event.editor.getData();
    if (this.message.trim().length > 0) {
      this._manifoldPanelService.managePrimaryActionStyle(false);
    }
  }

  async primaryAction() {
    this.spinnerOverlayService.show();
    await this.uploadFileIfAtatched().then((response) => {
      this.spinnerOverlayService.hide();
      this.onClose();
      this._manifoldPanelService.closeCurrentManifoldPanel();
    });
  }

  onUploadFiles(files: any) {
    this.filesList = files;
  }

  uploadFileIfAtatched() {
    return new Promise((resolve, reject) => {
      if (this.filesList && this.filesList.length > 0) {
        const promises: any = [];
        let headers = new HttpHeaders();
        combineLatest(
          this.userFacade.AuthState$,
          this._orgFacade.selectedOucode$,
          this._orgFacade.selectedTenant$
        ).subscribe(([tokenModel, selectedOucode, selectedTenant]) => {
          const token = tokenModel.accessToken;
          if (token && selectedOucode && selectedTenant) {
            headers = headers
              .append('Authorization', 'Bearer ' + token)
              .append('TenantId', selectedTenant)
              .append('Oucodes', selectedOucode.Oucode);
            lodash.forEach(this.filesList, (file: any) => {
              const fd = new FormData();
              fd.append('filePayload', file.data);
              promises.push(
                this._http.post(
                  this.prismChatURL + `upload?fileName=${file.name}`,
                  fd,
                  { headers }
                )
              );
            });
            forkJoin(promises).subscribe(async (res: any) => {
              const tokens = res.map((x: any) => x.upload.token);
              resolve(await lastValueFrom(this.updateRequest(tokens)));
            });
          }
        });
      } else {
        this.updateRequest(null).subscribe(() => {
          resolve('');
        });
      }
    });
  }

  updateRequest(files: [] | null) {
    return this._zendeskAPIClient.updateRequest(this.requestId, {
      request: {
        comment: {
          html_body: this.message,
          uploads: files,
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  panelClose() {
    this.onClose();
  }

  onClose() {
    const eventItem: EventItem = {
      payload: { ticketId: this.requestId },
    };
    this._eventService.publish('onReplyDrawerClose', eventItem);
  }
  secondaryAction() {}
}
