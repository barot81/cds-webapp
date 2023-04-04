import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {
  BaseComponent, EventItem, UIState
} from '@zhealthcare/fusion/core';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { IdentityApiClient } from './../../identity-api-client.service';
import { Subject } from 'rxjs';
import { UserFacade } from '@zhealthcare/fusion/core';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BaseComponent
  implements OnDestroy {
  private _unsubscribe: Subject<any>;
  id = 0;
  initials = false;
  firstName = '';
  lastName = '';
  ProfileUrl = 'assets/users.png';
  fullname: string;
  displayInitial = '';
  loading = true;
  constructor(
    public router: Router,
    private userFacade: UserFacade,
    private identityApiService: IdentityApiClient
  ) {
    super();
    this.displayInitial = '';
    this._unsubscribe = new Subject();
  }


  openAccoutSetting() {
    const uiState = new UIState(AccountSettingComponent, this.id);
    const eventItem: EventItem = { payload: uiState };
    this.updateRefArea(eventItem);
  }

  CreateInitials() {
    if (!this.firstName && !this.lastName) {
      return;
    }
    if ((this.firstName == null && this.lastName !== null) || undefined) {
      this.fullname = this.lastName;
      return this.fullname[0];
    }
    if ((this.firstName !== null && this.lastName == null) || undefined) {
      this.fullname = this.firstName;
      return this.fullname[0];
    }
    if ((this.firstName !== null && this.lastName !== null) || undefined) {
      this.fullname = this.lastName+ ', ' + this.firstName;
      const nameArray = this.fullname.split(' ');
      if (nameArray.length > 1) {
        return (
          nameArray[0].substring(0, 1).toUpperCase() +
          nameArray[nameArray.length - 1].substring(0, 1).toUpperCase()
        );
      }
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
