import { TokenSessionInfo } from '@exxat/fusion/models';
import { Logger } from '../../services';
export class UserActivityStatus {
  constructor(public isActive = false, public isActiveOnAnotherTab = false) {}
}

export class TokenHelper {
  static isTokenRenewRequired: boolean;
  static hasPopup: boolean;
  static readonly defaultInactivityPeriod = 30 * 60000;
  static UserInactivityPeriod = TokenHelper.defaultInactivityPeriod; //(10000) in general 30 * 60000(1min)
  static readonly TimeBeforeTokenExpiry = 5 * 60000; //(4.8) 300000 = 5 minutes before accesstoken will expired
  static readonly OldTokenDeactivationTime = 2 * 60000; // (10000)
  static readonly sessionTimeoutPopupTimer = 5 * 60000;

  static isUserActive(tokenExpiryInfo: TokenSessionInfo): UserActivityStatus {
    if (tokenExpiryInfo && tokenExpiryInfo.lastActivityTime > 0) {
      let dateDiff = new Date().getTime() - tokenExpiryInfo.lastActivityTime;
      const isUserActive = dateDiff > 0 && dateDiff <= this.UserInactivityPeriod;
      let isActiveOnAnotherTab = false;
      if (!isUserActive) {
        const tokenInfo = JSON.parse(localStorage.getItem('tokenSessionInfo'));
        if (!!tokenInfo && !!tokenInfo.lastActivityTime) {
          dateDiff = new Date().getTime() - tokenInfo.lastActivityTime;
          isActiveOnAnotherTab =
            dateDiff > 0 && dateDiff <= this.UserInactivityPeriod;
          if (isActiveOnAnotherTab) {
            this.UserInactivityPeriod = this.UserInactivityPeriod - dateDiff;
            Logger.trace(
              `User Active in another tab timeout : ${this.UserInactivityPeriod}`
            );
          } else {
            this.UserInactivityPeriod = this.defaultInactivityPeriod;
          }
        }
      }
      return new UserActivityStatus(isUserActive, isActiveOnAnotherTab);
    }
  }

  static enableAutoRenewFlag() {
    this.isTokenRenewRequired = true;
    // localStorage.setItem(TokenConstants.HAS_TOKEN_REQUIRED, 'true');
  }

  static disableAutoRenewFlag() {
    this.isTokenRenewRequired = false;
    // localStorage.setItem(TokenConstants.HAS_TOKEN_REQUIRED, 'false');
  }

  static checkAutoRenewEnabled(): boolean {
    return this.isTokenRenewRequired ?? true;
    // const hasTokenRequiredStr = localStorage.getItem(TokenConstants.HAS_TOKEN_REQUIRED);
    // return (!!hasTokenRequiredStr ? JSON.parse(hasTokenRequiredStr) : true);
  }
  // static isUserActiveInAnotherTab() {
  //     const tokenInfostr = localStorage.getItem('tokenSessionInfo');
  //     if(!!tokenInfostr) {
  //         const tokenInfo = JSON.parse(tokenInfostr);
  //         if(!!tokenInfo && !!tokenInfo.lastActivityTime) {
  //             const dateDiff = new Date().getTime() - tokenInfo.lastActivityTime;
  //             return dateDiff > 0 && dateDiff <= this.UserInactivityPeriod;
  //         }
  //     }
  //     return false;
  // }

  // TimeBeforeTokenExpiry

  // static readonly TokenActivationWindow = 60000; //30; // UserInactivityTimePeriod
  // static readonly OldTokenDeactivationTime = 20000;      //120000;    // 2 minutes = 120 seconds
  // static readonly PopupBlockPeriod = 60000; // 300000 ( 5 minutes)
}

