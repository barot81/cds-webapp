import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenModel } from '@exxat/fusion/models';
import { IdentitySandbox } from '../../identity.sandbox';
import { AuthService, UserFacade } from '@exxat/fusion/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-redirect',
  template: ''
})
export class V4RedirectComponent implements OnInit {
  tokenModel: TokenModel = new TokenModel();
  constructor(private router: ActivatedRoute, private identitySandbox: IdentitySandbox, private authService: AuthService, private userFacade: UserFacade, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((resp) => {
      var refreshHash = resp._ert;
      var isV3V4 = resp._isv3v4;
      localStorage.setItem("isV3V4",isV3V4.toLocaleLowerCase());
      if(refreshHash)
      {
        this.identitySandbox.getTokenFromRefreshHash(refreshHash).subscribe((resp)=>{
          this.tokenModel = resp;
          const tokenData = this.authService.parseJwtToken(resp.accessToken);
          if(tokenData !== undefined && this.tokenModel != null && this.tokenModel != undefined && this.tokenModel.accessToken){
            const userData = JSON.parse(tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']);
            return this.userFacade.LoginSuccess({ auth: this.tokenModel, user: userData });
          }
        }, error => {
          if(error.status == 401)
            this._snackBar.open("You are not authorized to access this account", null, {
              duration: 5000,
            })
            this.userFacade.LogOut();
        });
      }
    });
  }
}
