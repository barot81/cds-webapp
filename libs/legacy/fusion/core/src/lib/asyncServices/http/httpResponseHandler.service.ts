import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { FusionConfigService } from './../../configuration/fusion-config.service';
import { UserFacade } from './../../store/facades/user.facade';
import { take } from 'rxjs/operators';
import { NotificationService } from './../../services/utility/notification.service';
import { Logger } from '../../services/logger/logger.extension';
import { SessionLoggedoutDialogComponent } from '../../component/session-timeout/session-loggedout-dialog/session-loggedout-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { URLConstants } from '../../helper/constants';


@Injectable({providedIn: 'any'})
export class HttpResponseHandler {
  showNotification: boolean = true;
  constructor(
    private readonly router: Router,
    private notificationService: NotificationService,
    private readonly userFacade: UserFacade,
    private readonly configService: FusionConfigService,
    private readonly route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  public onCatch(response: any, source: Observable<any>): Observable<any> {
    switch (response.status) {
      case 400:
        this.handleBadRequest(response);
        break;

      case 401:
        this.handleUnauthorized(response);
        break;

      case 403:
        this.handleForbidden(response);
        break;

      case 404:
        this.handleNotFound(response);
        break;

      case 502:
        this.notificationService.showError(
          'Bad Gateway',
          'Something went wrong, please try again in short time.',
          {
            timeOut: 10000,
            showProgressBar: true,
            pauseOnHover: true,
            preventDuplicates: true,
            position: ['top', 'right'],
            theClass: 'sy-notification'
          }
        );

        Logger.error(
          `httpResponseHandler => onCatch Method => Bad Gateway : Something went wrong, please try again in short time. error :${JSON.stringify(
            response
          )} | Current Url: ${this.route}`
        );
        break;
      case 503:
        this.notificationService.showError(
          'Service Unavailable',
          'Something went wrong , please try again in short time.',
          {
            timeOut: 10000,
            showProgressBar: true,
            pauseOnHover: true,
            preventDuplicates: true,
            position: ['top', 'right'],
            theClass: 'sy-notification'
          }
        );
        Logger.error(
          `httpResponseHandler => onCatch Method => Service Unavailable : Something went wrong , please try again in short time. error :${JSON.stringify(
            response
          )} | Current Url: ${this.route}`
        );
        break;

      default:
        if (
          response.error?.Status != null &&
          typeof response.error.Status === 'object'
        )
          this.handleServerError(response.error?.Status);
        else this.handleServerError(response);
    }

    return throwError(response);
  }

  public handleActonResponse(response: any) {
    if (response?.status != null && typeof response.status === 'object') {
      if (response.status.message) {
        response.status.statusText = response.status.message;
        this.notificationService.displayNotification(
          response.status,
          response.status.responseType,
          'Success'
        );
      }
    }
  }

  // public handleTokenRenew(response: any) {
  //   const responseHeader = response.headers.get('identity_token_expired');
  //   if (responseHeader === 'accessToken_renew_required') {
  //      this.userFacade.updateUserLastActivityTime();
  //   }
  // }

  // /**
  //  * Shows notification errors when server response status is 401
  //  *
  //  * @param error
  //  */
  private handleBadRequest(responseBody: any): void {
    if (responseBody._body) {
      try {
        const bodyParsed = responseBody.json();
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        this.handleServerError(responseBody);
      }
    } else {
      this.handleServerError(responseBody);
    }
  }

  // /**
  //  * Shows notification errors when server response status is 401 and redirects user to login page
  //  *
  //  * @param responseBody
  //  */
  private handleUnauthorized(responseBody: any): void {
    responseBody.ShowItAsToaster = true;
    this.notificationService.displayNotification(
      responseBody,
      'error',
      'Your session has expired please login again'
    );
    // Read configuration in order to see if we need to display 401 notification message
    this.userFacade.UserState$.pipe(take(1)).subscribe((state) => {
      if (!!state && state.isAuthenticated === true) {
        Logger.trace(
          `httpResponseHandler => handleUnauthorized Method => bearer_lifetime_expired => Current State: ${JSON.stringify(
            state
          )} | Current Url: ${this.route}`
        );
        if (JSON.parse(sessionStorage.getItem('IsDelegateUser'))) {
          this.router.navigateByUrl('delegator/session-timeout');
        } else if (
          !this.router.url.toLowerCase().includes(URLConstants.LOGIN_URL)
        ) {
          this.openTimedoutDialog();
          this.userFacade.LogOut();
        }
      }
    });
  }

  // /**
  //  * Shows notification errors when server response status is 403
  //  */
  private handleForbidden(responseBody: any): void {
    responseBody.ShowItAsToaster = true;
    // this.notificationService.displayNotification(
    //   responseBody,
    //   'error',
    //   "You don't have permission to access. Contact your administrator"
    // );
    // Logger.error(
    //   `httpResponseHandler => handleForbidden Method => You don't have permission to access. Contact your administrator. | Response Body : ${JSON.stringify(
    //     responseBody
    //   )}| Current Url: ${this.route}`
    // );

    const subscription_required = responseBody.headers.get(
      'subscription_required'
    );
    if (subscription_required != null && subscription_required === 'true') {
      this.router.navigateByUrl('/payment/subscriptions');
    }
  }

  // /**
  //  * Shows notification errors when server response status is 404
  //  *
  //  * @param responseBody
  //  */
  private handleNotFound(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
    responseBody.ShowItAsToaster = true;
    this.notificationService.displayNotification(
      responseBody,
      'error',
      'Resource not found'
    );
    let notFoundEndpoints: Array<string> =
      this.configService.appSettings.notifications.unauthorizedEndpoints;
    if (notFoundEndpoints) {
      notFoundEndpoints = notFoundEndpoints.filter(
        (endpoint) => this.getRelativeUrl(responseBody.url) === endpoint
      );
    }
    console.log(notFoundEndpoints);
  }

  // /**
  //  * Shows notification errors when server response status is 500
  //  */
  private handleServerError(response: any): void {
    if (response?.Message) {
      response.statusText = response.Message;
      if (response.ResponseType) {
        this.notificationService.displayNotification(
          response,
          response.ResponseType,
          'Contact to respective person'
        );
      }
    }
  }

  // /**
  //  * Parses server response and shows notification errors with translated messages
  //  *
  //  * @param response
  //  */
  private handleErrorMessages(response: any): void {
    if (!response) {
      return;
    }
    for (const key of Object.keys(response)) {
      if (Array.isArray(response[key])) {
        response[key].forEach((value) =>
          this.notificationService.displayNotification(
            this.getTranslatedKey(value),
            'error'
          )
        );
      } else {
        this.notificationService.displayNotification(
          this.getTranslatedKey(response[key]),
          'error'
        );
      }
    }
  }

  // /**
  //  * Extracts and returns translated value from server response
  //  *
  //  * @param value
  //  */
  private getTranslatedKey(key: string): string {
    if (key.indexOf('[') > -1) {
      key = key.substring(key.lastIndexOf('[') + 1, key.lastIndexOf(']'));
    }
    return key;
  }

  // /**
  //  * Returns relative url from the absolute path
  //  *
  //  * @param responseBody<<<<
  //  */
  private getRelativeUrl(url: string): string {
    return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, '');
  }

  private openTimedoutDialog() {
    this.dialog.open(SessionLoggedoutDialogComponent, {
      disableClose: true,
      width: '500px'
    });
  }
}
