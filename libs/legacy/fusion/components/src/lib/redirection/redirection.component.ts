import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFacade } from '@zhealthcare/fusion/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'redirection-component',
  template: ``,
})
export class RedirectionComponent {
  constructor(
    private readonly _userFacade: UserFacade,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this._userFacade.UserState$.pipe(take(1)).subscribe((state: any) => {
      if (state && state.user) {
        this.router.navigate([state.user.ReferenceKey], {
          relativeTo: this.route,
          replaceUrl: true,
        });
      }
    });
  }
}
