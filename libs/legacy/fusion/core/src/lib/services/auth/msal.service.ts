import { Injectable } from '@angular/core';

import * as Msal from 'msal';
import { FusionConfigService } from '../../configuration/fusion-config.service';
import { TokenModel, LoginType } from '@zhealthcare/fusion/models';
import { AuthService } from './auth.service';
import { UserFacade } from '../../store/facades/user.facade';
import { Router } from '@angular/router';

@Injectable({providedIn: 'any'})
export class MsalService {
    azureAdB2C: any;
    B2CTodoAccessTokenKey = "Authorization";
    authority : any;
    clientApplication : any;

    constructor( private readonly config: FusionConfigService,
        private readonly authService: AuthService,
        private readonly userFacade: UserFacade,
        private readonly router: Router ){
        this.azureAdB2C = this.config.get("azureAdB2C");
        if(this.azureAdB2C)
        {
            this.authority  = `https://${this.azureAdB2C.activeDirectory}.b2clogin.com/tfp/${this.azureAdB2C.tenant}/${this.azureAdB2C.signUpSignInPolicyId}`;
            this.clientApplication = new Msal.UserAgentApplication(this.azureAdB2C.clientId);//, this.authority, this.authCallback, {redirectUri: this.azureAdB2C.redirectUri, validateAuthority: false});
        }
    }

    authCallback = (errorDesc, token, error, tokenType) => {
        if(token)
        {
            const {tokenModel, userData} = this.getTokenInfo(token);
            this.setStorage(tokenModel, userData);
            if(!userData.NewUser)
            {
                this.router.navigateByUrl(this.config.get("authGuardSettings")?.launchUrl);
            }
        }
        if(error)
        {
            console.log(error);
        }
    }

    public login():void{

      this.clientApplication.authority = `https://${this.azureAdB2C.activeDirectory}.b2clogin.com/tfp/${this.azureAdB2C.tenant}/${this.azureAdB2C.signUpSignInPolicyId}`;
      this.authenticate(this.clientApplication);
    }

    public signup():void{
      this.clientApplication.authority = `https://${this.azureAdB2C.activeDirectory}.b2clogin.com/tfp/${this.azureAdB2C.tenant}/${this.azureAdB2C.signUpSignInPolicyId}`;
      this.authenticate(this.clientApplication);
    }

    public authenticate(clientApplication: Msal.UserAgentApplication): void {
        if(this.azureAdB2C.loginType && this.azureAdB2C.loginType === LoginType[LoginType.POPUP])
        {
            this.loginPopup(clientApplication);
        }
        else
        {
            clientApplication.loginRedirect();
        }
    }

    setAuth(token: string){
        const {tokenModel, userData} = this.getTokenInfo(token);
        if(userData.NewUser)
        {
            this.authService.adSignUp(userData, tokenModel).subscribe(resp => {
                this.userFacade.LoginSuccess({ auth: tokenModel, user: userData });
                });
        }
        else
        {
            this.userFacade.LoginSuccess({ auth: tokenModel, user: userData });
        }
    }

    forgotPassword(){
        const clientApplicationPasswordReset = new Msal.UserAgentApplication(this.azureAdB2C.clientId);
        //, authority, this.authCallback, {redirectUri: this.azureAdB2C.redirectUri, validateAuthority: false});
        this.authenticate(clientApplicationPasswordReset);
    }

    getTokenInfo(accessToken: string): any{
        const tokenModel = new TokenModel();
        tokenModel.accessToken = accessToken;
        const tokenData = this.authService.parseJwtToken(accessToken);
        const roles = tokenData['extension_RoleCodes'].split(',');
        const userRoles = new Array();
        roles.forEach(userRole => {
            userRoles.push({UserId: tokenData['oid'], RoleCode: userRole})
        });

        const userData = {
            UserId: tokenData['oid'],
            FirstName: tokenData['extension_FirstName'],
            LastName: tokenData['extension_LastName'],
            Email: tokenData['emails'][0],
            PhoneNumber: tokenData['extension_PhoneNumber'],
            UserRoles: userRoles,
            Token: tokenModel,
            UserName: tokenData['emails'][0],
            NewUser: tokenData['newUser']
        }

        return {tokenModel, userData};
    }

    logout(): void {
        this.clientApplication.logout();
    }

    isLoggedIn(): boolean {
        return this.clientApplication.getUser() != null;
    }

    getUserEmail(): string{
       return this.getUser().idToken['emails'][0];
    }

    getUser(){
      return this.clientApplication.getUser()
    }

    loginPopup(clientApplication: Msal.UserAgentApplication) {
        clientApplication.loginPopup(this.azureAdB2C.b2cScopes).then(function (idToken: any) {
            this.clientApplication.acquireTokenSilent(this.azureAdB2C.b2cScopes, this.clientApplication.authority).then(
                function (accessToken: any) {
                   this.setAuth(accessToken);
                }, function (error: any) {
                    this.clientApplication.acquireTokenPopup(this.azureAdB2C.b2cScopes).then(
                        function (accessToken: any) {
                            this.setAuth(accessToken);
                        }, function (subError: any) {
                            console.log('error: ', subError);
                        });
                })
        }, function (error: any) {
            if(error.match(/AADB2C90118/) )
            {
                this.forgotPassword();
                console.log(error);
            }
            console.log(error);
        });
    }

    setStorage(tokenModel: any, userData: any) {
        this.userFacade.LoginSuccess({ auth: tokenModel, user: userData });
        localStorage.setItem('Auth', JSON.stringify(tokenModel));
        localStorage.setItem('User', JSON.stringify(userData));
    }
}
