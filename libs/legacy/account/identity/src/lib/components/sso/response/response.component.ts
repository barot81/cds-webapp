import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentitySandbox } from '../../../identity.sandbox';
import { BaseComponent, AuthService, UserFacade, FusionConfigService, UserConsentSandbox } from '@zhealthcare/fusion/core';
import { TokenModel, User } from '@zhealthcare/fusion/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { checkAndRedirectToConsent } from '../../../helper/login-flows.helper';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'sso-response',
    templateUrl: './response.component.html'
})
export class ResponseComponent extends BaseComponent implements OnInit, OnDestroy {
    tokenModel: TokenModel = new TokenModel();
    targetUrl: string;
    private _unsubscribeAll: Subject<any>;
    constructor(private router: ActivatedRoute, private identitySandbox: IdentitySandbox, private authService: AuthService, private userFacade: UserFacade, private configService: FusionConfigService, private _snackBar: MatSnackBar, private userConsentSandbox: UserConsentSandbox, private route: Router) {
        super();
        this.configService.uiSettings = {
            layout: {
                navbar: {
                    hidden: true
                },
                header: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        this._unsubscribeAll = new Subject();

    }

    ngOnInit() {
        this.router.queryParams.subscribe((resp) => {
            var responseKey = resp.responseKey;
            if (responseKey) {
                this.identitySandbox.getSAMLAuthResponse(responseKey).subscribe(resp => {
                    this.tokenModel.accessToken = resp.item1;
                    this.tokenModel.refreshToken = resp.item2;
                    this.tokenModel.expiration = resp.item3;
                    this.targetUrl = resp.item4;
                    const tokenData = this.authService.parseJwtToken(this.tokenModel.accessToken);
                    if (tokenData !== undefined) {
                        const userData: User = JSON.parse(tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']);
                        userData.isSSOUser = true;
                        //toggling Go To V3 option for SSO users on basis of true false
                        if (this.targetUrl !== null && this.targetUrl.includes("True")) {
                            localStorage.setItem('isV3V4', 'true');
                            this.targetUrl = this.targetUrl.replace('True', '');
                            this.userFacade.LoginSuccess({
                                auth: this.tokenModel,
                                user: userData,
                                targetUrl: this.targetUrl
                            });
                        }
                        else if (this.targetUrl !== null && this.targetUrl.includes("False")) {
                            localStorage.setItem('isV3V4', 'false');
                            this.targetUrl = this.targetUrl.replace('False', '');
                            this.userFacade.LoginSuccess({ auth: this.tokenModel, user: userData, targetUrl: this.targetUrl });
                        }
                        else
                            this.userFacade.LoginSuccess({ auth: this.tokenModel, user: userData, targetUrl: this.targetUrl });
                    }
                }, error => {
                    if (error.status == 401)
                        this._snackBar.open("You are not authorized to access this account", null, {
                            duration: 5000,
                        })
                    this.userFacade.LogOut();
                    this.route.navigateByUrl(this.configService.get("authGuardSettings").loginUrl);
                });
            }
        });
        this.userFacade.UserState$.pipe(takeUntil(this._unsubscribeAll)).subscribe((userState) => {
            if (userState && userState.user?.FirstName) {
                checkAndRedirectToConsent(userState, this.userConsentSandbox, this.authService, this.route);
            }
        });
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

}
