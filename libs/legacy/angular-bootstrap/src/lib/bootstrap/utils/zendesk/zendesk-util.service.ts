import { Injectable } from '@angular/core';
import { OrgFacade, UserFacade, UserTypeService } from '@zhealthcare/fusion/core';
import { UserPersona } from '@zhealthcare/fusion/models';
import { ZendeskService, ZendeskUser } from '@zhealthcare/zendesk';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { combineLatest, take, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZendeskUtilService {
  allowedPersonas = [UserPersona.Student];
  private activeUserType: UserPersona;
  userDetails: any = {
    fullName: '',
    id: '',
    email: '',
  };
  orgFacadeData: any = {};
  zendeskuser: ZendeskUser = {
    username: null,
    email: null,
    id: null,
    organization: null,
    allowedPersonas: [],
    activeUserType: null,
  };

  constructor(
    private _NgxZendeskWebwidgetService: NgxZendeskWebwidgetService,
    private zendeskservice: ZendeskService,
    private readonly userFacade: UserFacade,
    private readonly orgFacade: OrgFacade,
    private readonly userTypeService: UserTypeService
  ) {}

  prismChat(_unsubscribeAll: any) {
    const initZendeskPromise = this.zendeskservice.initialiseZendesk();
    initZendeskPromise.then(() => {
      this._NgxZendeskWebwidgetService.zE('webWidget', 'hide');
      this.userState(_unsubscribeAll);
    });
  }
  userState(_unsubscribeAll: any) {
    this.userFacade.AuthState$.pipe(takeUntil(_unsubscribeAll)).subscribe(
      (authState) => {
        if (authState && authState.accessToken) {
          const combinedStateObservers: any = [];
          combinedStateObservers.push(this.userFacade.UserState$.pipe(take(1)));
          combinedStateObservers.push(this.orgFacade.OrgState$.pipe(take(1)));
          if (this.userTypeService.getUserType()) {
            this.activeUserType = this.userTypeService.getUserType();
          } else {
            combinedStateObservers.push(
              this.userTypeService.userPersona$.pipe(take(1))
            );
          }

          combineLatest(combinedStateObservers).subscribe((values) => {
            const userState = values[0];
            const orgState = values[1];
            if (values[2]) {
              this.activeUserType = values[2];
            }
            this.userDetails.fullName =
              userState?.user?.LastName !== null &&
              userState?.user?.LastName !== ''
                ? `${userState?.user?.LastName}, ${userState?.user?.FirstName}`
                : userState?.user?.FirstName;
            this.userDetails.email = userState?.user?.Email;
            this.userDetails.id = userState?.user?.Id;
            this.orgFacadeData = orgState;
            this.onLogin();
          });
        }
      }
    );
  }

  onLogin() {
    if (
      this.userDetails &&
      this.userDetails.fullName &&
      this.orgFacadeData &&
      this.orgFacadeData.TenantWithOuCodeTree
    ) {
      this.zendeskuser.username = this.userDetails.fullName;
      this.zendeskuser.email = this.userDetails.email;
      this.zendeskuser.id = this.userDetails.id;
      this.zendeskuser.organization =
        this.orgFacadeData.TenantWithOuCodeTree.TenantId;
      this.zendeskuser.allowedPersonas = this.allowedPersonas;
      this.zendeskuser.activeUserType = this.activeUserType;

      this.zendeskservice.checkUserOnLogin(this.zendeskuser);
    } else {
      this._NgxZendeskWebwidgetService.zE('webWidget', 'hide');
    }
  }

  zendeskUpdateSettings(settings: any) {
    this._NgxZendeskWebwidgetService.zE('webWidget', 'updateSettings', {
      webWidget: {
        chat: settings,
      },
    });
  }
}
