import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AppStateHelper, AuthService, FusionConfigService, Logger,
  URLConstants, UserFacade
} from '@exxat/fusion/core';
import {
  OuCode,
  TenantWithOuCodes,
  TokenModel,
  TokenSessionInfo,
  User
} from '@exxat/fusion/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'auto',
  templateUrl: './delegator.component.html',
  styleUrls: ['./delegator.component.scss']
})
export class DelegatorComponent implements OnInit, OnDestroy {
  key: string;
  is400Error = false;
  is404Error = false;
  tokenModel: TokenModel = new TokenModel();
  tenantId: string;
  targetUrl: string;
  tenantWithOuCodes: Array<TenantWithOuCodes> = [];
  OuCodes: Array<OuCode> = [];
  private _unsubscribeAll: Subject<any>;
  @ViewChild('validationDialog', { static: true })
  validationDialog: TemplateRef<any>;
  isLinkExpired = false;
  launchUrl: any;
  errorMessage = "Oops, the link you followed has expired. This may have happened due to some changes in the workflow";
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpClient: HttpClient,
    private readonly configService: FusionConfigService,
    private readonly authService: AuthService,
    private readonly userFacade: UserFacade,
    private readonly dialog: MatDialog
  ) {
    this.launchUrl = URLConstants.DELEGATOR_LAUNCH_URL;
    this._unsubscribeAll = new Subject();
    this.configService.uiSettings = {
      layout: {
        navbar: {
          hidden: true
        },
        header: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }
  ngOnInit(): void {
    sessionStorage.setItem('delegatorUrl', this.router.url);
    this.route.queryParamMap.subscribe(queryParams => {
      this.key = queryParams.get('key');
      sessionStorage.setItem("NotificationKey",this.key);
    });

    this.httpClient
      .get<any>(
        this.authService.getEndpoint(
        `${
          this.configService.appSettings.auth.endpoint
        }/Gateway/Delegator?key=${this.key}`
      ))
      .toPromise()
      .then(x => {
        this.tokenModel.accessToken = x.item1;
        this.tokenModel.refreshToken = x.item2;
        this.tokenModel.expiration = x.item3;
        this.targetUrl = x.item4;
        const tokenData = this.authService.parseJwtToken(
          this.tokenModel.accessToken
        );
        if (tokenData !== undefined) {
          const userData: User = JSON.parse(
            tokenData[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'
            ]
          );
          let tokenSessionInfo = new TokenSessionInfo(0,0);
          if(tokenData !== undefined) {
            tokenSessionInfo  = new TokenSessionInfo(
              AppStateHelper.getCurrentTimeStamp,
              AppStateHelper.getTokenExpTime(parseInt(this.tokenModel.expiration)),
              userData.LastName + ' ' + userData.FirstName
            );
          }
          this.userFacade.DelegateLoginSuccess({
            auth: this.tokenModel,
            user: userData,
            targetUrl: this.targetUrl,
            tokenSessionInfo: tokenSessionInfo
          });
          this.userFacade.UserState$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((data)=>{
            if(data.isLoaded) {
              this.authService.setUserInfo(data.user.FirstName,data.user.LastName, data.user.UserName,"", true);
              const targetUrl: string = this.targetUrl;
              const tagetUrlendpoint = `?targetUrl=${encodeURIComponent(targetUrl)}`;
              this.router.navigateByUrl(`${this.launchUrl}${targetUrl ? tagetUrlendpoint : ''}`);
            }
          });
        }
      })
      .catch(x => {
        if(x.error?.statusCode == 410)
          this.isLinkExpired = true;
        if(x.status === 404 || x.error?.statusCode === 404)
          this.is404Error = true;
        if (x.status === 401 && !this.is404Error) {
          Logger.error(`Delegator Component => ngOnInit Method => Error in Gateway Delegator User is unauthorized: ${JSON.stringify(x)} |active Route:${this.route?.url}`);
          if(x.error)
            this.errorMessage = x.error;
          this.dialog.open(this.validationDialog, {
            width: '500px',
            disableClose: true
          });
        }
        if(x.status === 400 || x.error?.statusCode === 400)
          this.is400Error = true;
      });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
