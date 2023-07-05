import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'zhc-azuread-identity',
  templateUrl: 'azuread-identity.component.html',
})
export class AzureAdIdentityComponent implements OnInit, OnDestroy {
  isUserLoggedin: boolean;
  private readonly _destroy = new Subject<void>();
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService
  ) {}

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
          this.authService.instance.getAllAccounts().length > 0;
      });
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:5200',
    });
  }
}
