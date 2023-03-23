import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenHelper } from '../../../helper/token/token.helper';
import { Logger } from '../../../services/logger/logger.extension';

@Component({
  selector: 'fusion-delegator-session-timeout',
  templateUrl: './delegator-session-timeout.component.html'
})
export class DelegatorSessionTimeoutComponent  {

  constructor(private router: Router) { }


  
  onPageRefresh() {
    const delegatorUrl = sessionStorage.getItem('delegatorUrl');
    this.router.navigateByUrl(delegatorUrl);
    Logger.trace('Delegator User on Page Refresh called.');
    TokenHelper.enableAutoRenewFlag();
  }

}
