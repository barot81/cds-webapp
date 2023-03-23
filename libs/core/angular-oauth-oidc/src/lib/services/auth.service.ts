/* eslint-disable brace-style */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  /**
   * Publishes `true` if and only if
   * (a) all the asynchronous initial login calls have completed or errorred, and
   * (b) the user ended up being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the network calls for initial log in have all been done
   */
  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$,
  ]).pipe(map((values) => values.every((b) => b)));

  private navigateToLoginPage() {
    this.router.navigateByUrl(this.oauthService?.['config']?.loginUrl ?? '');
  }

  constructor(private oauthService: OAuthService, private router: Router) {
    window.addEventListener('storage', (event) => {
      // The `key` is `null` if the event was caused by `.clear()`
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      console.warn(
        'Noticed changes to access_token (most likely from another tab), updating isAuthenticated'
      );
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );

      if (!this.oauthService.hasValidAccessToken()) {
        this.navigateToLoginPage();
      }
    });

    window.addEventListener('load', (event) => {
      if (this.oauthService.hasValidAccessToken()) this.navigateToLoginPage();
    });

    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
    });
    this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

    this.oauthService.events
      .pipe(filter((e) => ['token_received'].includes(e.type)))
      .subscribe((e) => this.oauthService.loadUserProfile());

    this.oauthService.events
      .pipe(
        filter((e) => ['session_terminated', 'session_error'].includes(e.type))
      )
      .subscribe((e) => this.navigateToLoginPage());

    this.oauthService.setupAutomaticSilentRefresh();
  }

  public runInitialLoginSequence(): Promise<void> {
    if (location.hash) {
      console.log('Encountered hash fragment, plotting as table...');
      console.table(
        location.hash
          .substr(1)
          .split('&')
          .map((kvp) => kvp.split('='))
      );
    }

    return this.oauthService
      .loadDiscoveryDocument()

      .then(() => this.oauthService.tryLogin())

      .then(() => {
        
        return this.oauthService
          .silentRefresh()
          .then(() => Promise.resolve())
          .catch((result) => {
            const errorResponsesRequiringUserInteraction = [
              'interaction_required',
              'login_required',
              'account_selection_required',
              'consent_required',
            ];

            if (
              result &&
              result.reason &&
              errorResponsesRequiringUserInteraction.indexOf(
                result.reason.error
              ) >= 0
            ) {
              console.warn(
                'User interaction is needed to log in, we will wait for the user to manually log in.'
              );
              return Promise.resolve();
            }

            return Promise.reject(result);
          });
      })

      .then(() => {
        this.isDoneLoadingSubject$.next(true);

        if (this.oauthService.hasValidAccessToken()) {
          if (
            window.location.pathname === '/' &&
            this.oauthService.redirectUri
          ) {
              this.router
                .navigateByUrl(<string>this.oauthService.redirectUri)
                .then(() => {
                  this.redirectToStateUrl();
                  return Promise.resolve();
                });
          } else {
              this.router.navigateByUrl(window.location.pathname).then(() => {
                this.redirectToStateUrl();
                return Promise.resolve();
              });
          }
        }
      })
      .catch(() => this.isDoneLoadingSubject$.next(true));
  }

  private redirectToStateUrl() {
    if (
      this.oauthService.state &&
      this.oauthService.state !== 'undefined' &&
      this.oauthService.state !== 'null'
    ) {
      let stateUrl = this.oauthService.state;
      if (stateUrl.startsWith('/') === false) {
        stateUrl = decodeURIComponent(stateUrl);
      }
      console.log(
        `There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`
      );
      this.router.navigateByUrl(stateUrl);
    }
  }

  public login(targetUrl?: string) {
    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  public logout() {
    this.oauthService.logOut();
  }

  public refresh() {
    this.oauthService.silentRefresh();
  }

  public hasValidToken() {
    return this.oauthService.hasValidAccessToken();
  }

  public getIdentityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  public setAuthConfig(config: AuthConfig) {
    this.oauthService.configure(config);
  }
}
