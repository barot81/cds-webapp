import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fromEvent, of, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { MetaConstants, TokenConstants } from '../../../helper/constants';
import { TokenHelper } from '../../../helper/token/token.helper';
import { Logger } from '../../../services';
import { UserFacade } from '../../../store/facades/user.facade';
import { SessionLoggedoutDialogComponent } from '../session-loggedout-dialog/session-loggedout-dialog.component';

@Component({
  selector: 'session-timeout-dialog',
  templateUrl: './session-timeout-dialog.component.html',
  styleUrls: ['./session-timeout-dialog.component.scss'],
})
export class SessionTimeoutDialogComponent implements OnDestroy {
  // remainingTime: number;
  // timerShow: boolean;
  private _unsubscribe: Subject<any> = new Subject();
  private userName!: string;
  SessionDialogClickedEvent$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter((event) => event.key === 'sessionDialogClickEvent'),
    map((_) => {
      this.isContinueClicked = true;
      if (this.dialogRef) {
        this.dialogRef.close();
        this.userFacade.updateUserLastActivityTime();
      }
    })
  );

  // toggle$ = new BehaviorSubject(true);
  // K = 1000;
  // INTERVAL = this.K;
  // MINUTES = TokenHelper.sessionTimeoutPopupTimerInMins;
  // TIME = this.MINUTES * this.K * 60;
  // current: number;
  // time = this.TIME;
  isContinueClicked = false;
  popupTimer;
  popupEndTime;
  minutes$ = of('01');
  seconds$ = of('00');
  constructor(
    public dialogRef: MatDialogRef<SessionTimeoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { userName: string; expiryTimestamp: number },
    private readonly userFacade: UserFacade,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.timerCounter();
    this.SessionDialogClickedEvent$.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe();
    // this.remainingSeconds$.pipe(takeUntil(this._unsubscribe)).subscribe({
    //   complete: () => {
    //      if (!this.isYesClicked) {
    //        this.onNoClick();
    //       }
    //   }
    // });
  }

  private clearWorkSecCounter() {
    if (this.popupTimer) {
      clearInterval(this.popupTimer);
      this.popupTimer = 0;
    }
  }

  timerCounter() {
    this.clearWorkSecCounter();
    this.popupEndTime =
      new Date().getTime() + TokenHelper.sessionTimeoutPopupTimer;
    this.popupTimer = setInterval(() => this.remainingSecCount(), 1000);
  }

  remainingSecCount() {
    // const minutesElement = document.querySelector('.minutes');
    // let secondsElement = document.querySelector('.seconds');
    const secondsCount = Math.ceil(
      (this.popupEndTime - new Date().getTime()) / 1000
    );
    // if(!!this.seconds) {
    this.minutes$ = of(`0${Math.floor(secondsCount / 60)}`);
    const remainngSecs = secondsCount % 60;
    this.seconds$ = of(
      secondsCount < 10 ? `0${remainngSecs}` : `${remainngSecs}`
    );
    // }
    if (secondsCount <= 0) {
      this.seconds$ = of('00');
      this.clearWorkSecCounter();
      this.manageSessionTimeout();
    }
  }

  onContinueClick(): void {
    this.isContinueClicked = true;
    TokenHelper.hasPopup = true;
    if (JSON.parse(sessionStorage.getItem(MetaConstants.IsDelegateUser))) {
      this.userFacade.updateUserLastActivityTime();
      this.dialogRef.close();
      Logger.trace(
        `User Inactvitity popup - Continue session Clicked. for Delegator user.`
      );
    } else {
      this.userFacade.AuthState$.pipe(take(1)).subscribe((authState) => {
        this.userFacade.autoRenewToken(authState.refreshToken);
        this.userFacade.updateUserLastActivityTime();
        this.dialogRef.close();
      });
    }
    localStorage.setItem(
      TokenConstants.SESSION_DIALOG_CLICK_EVENT,
      JSON.stringify(Math.random())
    );
    Logger.trace(`User Inactvitity popup - Continue session Clicked.`);
    //this.clearWorkSecCounter();
  }

  private openTimedoutDialog() {
    this.dialog.open(SessionLoggedoutDialogComponent, {
      disableClose: true,
      width: '500px',
    });
  }

  manageSessionTimeout(): void {
    this.userFacade.UserState$.pipe(take(1)).subscribe((user) => {
      if (user && user?.user && user.user?.isSSOUser) {
        this.userName = user?.user?.UserName;
        this.manageSSOSessionTimeout();
      } else {
        this.onLogoutClick();
      }
    });
  }

  onLogoutClick(bypassTimedOutDialog?: boolean): void {
    this.dialogRef.close();
    if (!bypassTimedOutDialog) this.openTimedoutDialog();
    this.isContinueClicked = true;
    localStorage.setItem(
      TokenConstants.SESSION_DIALOG_CLICK_EVENT,
      JSON.stringify(Math.random())
    );
    Logger.trace(`Session Timeout dialog - Logout clicked.`);
    if (JSON.parse(sessionStorage.getItem(MetaConstants.IsDelegateUser))) {
      this.router.navigateByUrl('delegator/session-timeout');
      Logger.trace(
        'Delegate session timeout - redirecting to delegator refresh page.'
      );
    } else {
      this.userFacade.LogOut();
    }
    //this.clearWorkSecCounter();
  }

  manageSSOSessionTimeout(): void {
    this.dialogRef.close();
    this.router.navigate(['/session-timeout'], {
      queryParams: { userName: this.userName },
    });
    this.onLogoutClick(true);
    localStorage.setItem(
      'ssoLogoutRedirectURI',
      `/session-timeout?userName=${this.userName}`
    );
  }

  ngOnDestroy() {
    this.clearWorkSecCounter();
    // this.TIME = this.INTERVAL;
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

  // toMinutesDisplay = (ms: number) => Math.floor(ms / this.K / 60);
  // toSecondsDisplay = (ms: number) => Math.floor(ms / this.K) % 60;

  // toSecondsDisplayString = (ms: number) => {
  //   const seconds = this.toSecondsDisplay(ms);
  //   return seconds < 10 ? `0${seconds}` : seconds.toString();
  // };

  // currentSeconds = () => this.time / this.INTERVAL;
  // toMs = (t: number) => t * this.INTERVAL;
  // toRemainingSeconds = (t: number) => {
  //   return this.currentSeconds() - t;
  // }

  // remainingSeconds$ = this.toggle$.pipe(
  //   switchMap((running: boolean) => (running ? timer(0, this.INTERVAL) : NEVER)),
  //   map(this.toRemainingSeconds),
  //   takeWhile(t => t >= 0),
  // );

  // ms$ = this.remainingSeconds$.pipe(
  //   map(this.toMs),
  //   tap(t => {
  //     this.current = t;
  //   })
  // );

  // minutes$ = this.ms$.pipe(
  //   map(this.toMinutesDisplay),
  //   map(s =>s.toString()),
  //   startWith(this.toMinutesDisplay(this.time).toString())
  // );

  // seconds$ = this.ms$.pipe(
  //   map(this.toSecondsDisplayString),
  //   startWith(this.toSecondsDisplayString(this.time).toString())
  // );

  // update DOM
  // minutesElement = document.querySelector('.minutes');
  // secondsElement = document.querySelector('.seconds');
  // toggleElement = document.querySelector('.timer');

  // updateDom(source$: Observable<string>, element: Element) {
  //   source$.subscribe((value) => element.innerHTML = value);
  // }

  // showTimer() {
  //   this.updateDom(this.minutes$, this.minutesElement);
  //   this.updateDom(this.seconds$, this.secondsElement);
  // }
}
