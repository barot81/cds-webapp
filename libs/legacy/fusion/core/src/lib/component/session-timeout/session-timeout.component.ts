import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FusionConfigService } from '../../configuration';
import { URLConstants } from '../../helper/constants';

@Component({
  selector: 'base-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.scss'],
})
export class BaseSessionTimeoutComponent implements OnInit {
  userName: string;
  constructor(
    private _fusionConfigService: FusionConfigService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userName = this._activatedRoute.snapshot.queryParams?.['userName'];
    history.pushState(null, null, location.href);
    this._fusionConfigService.uiSettings = {
      layout: {
        navbar: {
          hidden: true,
        },
        header: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: true,
        },
      },
    };
  }

  logOut(eventName: string): void {
    localStorage.clear();
    if (eventName === 'logout_from_session_timeout')
      window.location.href = URLConstants.LOGIN_URL;
    else
      this.router.navigate([URLConstants.LOGIN_URL], {
        queryParams: {
          userName: this.userName,
        },
      });
  }
}
