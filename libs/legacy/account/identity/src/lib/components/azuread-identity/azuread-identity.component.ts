import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { UserService } from '@zhealthcare/fusion/core';
import { MsalAuthService } from '@zhealthcare/fusion/services';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'zhc-azuread-identity',
  templateUrl: 'azuread-identity.component.html',
  styleUrls: ['azuread-identity.component.scss']
})
export class AzureAdIdentityComponent implements OnInit, OnDestroy {
  isUserLoggedin: boolean;
  private readonly _destroy = new Subject<void>();
  loading = false;
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService,
    private router: Router,
    private userService: UserService,
    private msalAuthService: MsalAuthService
  ) {
    this.loading = JSON.parse(localStorage.getItem('loading'));
  }

  ngOnInit() {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (interactionStatus: InteractionStatus) =>
            interactionStatus === InteractionStatus.None
        ),
        takeUntil(this._destroy)
      )
      .subscribe(_ => {
        localStorage.setItem('isAuthenticated', 'true');
        this.isUserLoggedin =
          this.msalService.instance.getAllAccounts().length > 0;
          if(this.isUserLoggedin) {
            this.msalAuthService.getGroupsFromToken().then(groups => {
              if(this.msalAuthService.checkUserAccess(groups, ["Management", "MD CDI"]))
                this.router.navigateByUrl('/admin/account/launch');
              else
                this.router.navigateByUrl('/admin/pd-patients');
            })
            const instance = this.msalService.instance.getAllAccounts()[0];
            this.userService.setUserName(instance.name, instance.username);
          }
          this.loading = false;
          localStorage.removeItem('loading');
      });
  }

  handleAzureAd() {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.msalService.instance.setActiveAccount(payload.account);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
          this.msalService.instance.getActiveAccount()?.idTokenClaims
      });
  }


  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login() {
    this.loading = true;
    localStorage.setItem('loading', 'true');
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.msalService.loginRedirect();
    }
  }
}
