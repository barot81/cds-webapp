import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

import { RuntimeConfigLoaderService } from '@zhealthcare-core/angular-runtime-config';
import { ThemeSelectionService } from '@zhealthcare/ux';

import { DOCUMENT } from '@angular/common';
import { ZendeskUser } from '../models/zendesk.model';
import { PrimChatConfig } from '../prim-chat-config';
import { ZendeskAPIClient } from './zendesk.APIClient';

@UntilDestroy()
@Injectable({
  providedIn: 'any',
})
export class ZendeskService {
  accountURL: any;
  prismChatURL: any;
  emailToken: any;
  document!: Document;

  constructor(
    @Inject(DOCUMENT) document: Document,
    private _NgxZendeskWebwidgetService: NgxZendeskWebwidgetService,
    private _http: HttpClient,
    private _runtimeConfigLoaderService: RuntimeConfigLoaderService,
    private prismChatConfig: PrimChatConfig,
    private _themeSelectionService: ThemeSelectionService,
    private _zendeskAPIClient: ZendeskAPIClient
  ) {
    this.prismChatURL =
      _runtimeConfigLoaderService.getConfig().appSettings.services.prismChatURL.endpoint;
    this.accountURL = prismChatConfig.accountUrl;
    this.document = document;
  }

  initialiseZendesk() {
    return this._NgxZendeskWebwidgetService.initZendesk();
  }

  async checkUserOnLogin(zendeskuser: ZendeskUser) {
    await this.sendUserDetails(zendeskuser);
    this.identifyUser(zendeskuser);
  }

  identifyUser(zendeskuser: ZendeskUser) {
    this._NgxZendeskWebwidgetService.zE('webWidget', 'identify', {
      name: zendeskuser.username,
      email: zendeskuser.email,
      id: zendeskuser.id,
      organization: zendeskuser.organization,
    });
    this.prefillUserDatails(zendeskuser);
    this.showWidgetIfDeptActive();
    this.setColorTheme();
    this.setWidgetPosition();
  }

  prefillUserDatails(zendeskuser: ZendeskUser) {
    this._NgxZendeskWebwidgetService.zE('webWidget', 'prefill', {
      name: {
        value: zendeskuser.username,
        readOnly: true,
      },
      email: {
        value: zendeskuser.email,
        readOnly: true,
      },
    });
  }

  setColorTheme() {
    this._themeSelectionService.selectedThemeColor$
      .pipe(untilDestroyed(this))
      .subscribe((selectedThemeColor) => {
        this._NgxZendeskWebwidgetService.zE('webWidget', 'updateSettings', {
          webWidget: {
            color: {
              theme: selectedThemeColor,
            },
          },
        });
      });
  }

  setWidgetPosition() {
    const iframe: any = this.document.getElementById('launcher');
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      const btn = innerDoc.getElementById('Embed')?.querySelector('button');
      if (btn) {
        btn.style.padding = '5px 10px';
        btn.style['margin-top'] = '20px';
        btn.style['border-radius'] = '8px 0px 0px 0px';
        iframe.style.margin = '0px 0px';
        iframe.style.display = 'none';
      }
    }
    this._NgxZendeskWebwidgetService.zE('webWidget:on', 'open', () => {
      setTimeout(() => {
        const ifr: any = document.getElementById('webWidget');
        if (ifr) {
          ifr?.contentWindow?.document
            ?.getElementsByTagName('textarea')[0]
            ?.focus();
        }
      },500);
    });
  }

  showWidgetIfDeptActive() {
    this._NgxZendeskWebwidgetService.zE(
      'webWidget:on',
      'chat:departmentStatus',
      (dept: any) => {
        if (dept.name === 'Prism - Chat Agents' && dept.status === 'online') {
          this._NgxZendeskWebwidgetService.zE('webWidget', 'updateSettings', {
            webWidget: {
              chat: {
                departments: {
                  enabled: [''],
                  select: 'Prism - Chat Agents',
                },
                suppress: false,
              },
            },
          });
        } else if (
          dept.name === 'Prism - Chat Agents' &&
          dept.status !== 'online'
        ) {
          this._NgxZendeskWebwidgetService.zE('webWidget', 'updateSettings', {
            webWidget: {
              chat: {
                suppress: true,
              },
            },
          });
        }
      }
    );
  }

  sendUserDetails(zendeskuser: ZendeskUser) {
    return new Promise((resolve) => {
      this._zendeskAPIClient
      .getToken({
        userName: zendeskuser.username,
        email: zendeskuser.email,
        id: zendeskuser.id,
      })
      .subscribe((response: any) => {
        this.zendeskAuthenticateUser(response);
        this.checkIfUserExists(zendeskuser);
        if (
          zendeskuser.allowedPersonas.indexOf(zendeskuser.activeUserType) != -1
        ) {
          this._NgxZendeskWebwidgetService.zE('webWidget', 'show');
        } else {
          this._NgxZendeskWebwidgetService.zE('webWidget', 'hide');
        }
        resolve(response);
      });
    })
  }

  zendeskAuthenticateUser(response: any) {
    this._NgxZendeskWebwidgetService.zE('webWidget', 'updateSettings', {
      webWidget: {
        authenticate: {
          chat: {
            jwtFn: function (callback: any) {
              callback(response.jwt);
            },
          },
        },
      },
    });
    this._NgxZendeskWebwidgetService.zE('webWidget', 'chat:reauthenticate');
  }

  checkIfUserExists(zendeskuser: ZendeskUser) {
    this._zendeskAPIClient
      .user(zendeskuser.email)
      .subscribe((response: any) => {
        if (response.users && response.users.length == 0) {
          this.createUser(zendeskuser);
        }
      });
  }

  createUser(zendeskuser: ZendeskUser) {
    this._zendeskAPIClient
      .createUser({
        user: {
          verified: true,
          email: zendeskuser.email,
          name: zendeskuser.username,
          active: true,
          identities: [
            {
              type: 'email',
              value: zendeskuser.email,
            },
            {
              type: 'name',
              value: zendeskuser.username,
            },
            {
              type: 'id',
              value: `${zendeskuser.id}`,
            },
          ],
          ticketRestriction: 'requested',
          tags: ['Prism', 'Student', 'prism_v4', zendeskuser.organization],
        },
      })
      .subscribe((response: any) => {});
  }
}
