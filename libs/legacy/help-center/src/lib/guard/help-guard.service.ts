import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OrgFacade } from '@exxat/fusion/core';
import { SnackbarService } from '@exxat/ux';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class HelpGuardService implements CanActivate {
  constructor(
    public router: Router,
    private readonly orgFacade: OrgFacade,
    private _snackBarService: SnackbarService
  ) {}

  routes: any;

  async canActivate(): Promise<any> {
    const value = await firstValueFrom(this.orgFacade.selectedOucode$);
    if (!value) {
      this._snackBarService.openCustomSnackBar(
        { message: 'Please select the tenant and program.' },
        5000,
        '',
        'bottom'
      );
    }
    return value ? true : false;
  }
}
