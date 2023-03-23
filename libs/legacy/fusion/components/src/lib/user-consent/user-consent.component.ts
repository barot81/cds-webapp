import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FusionConfigService, getLaunchUrl, MetaConstants, UserConsentSandbox, UserFacade } from '@zhealthcare/fusion/core';

@Component({
    selector: 'user-consent',
    templateUrl: './user-consent.component.html',
    styleUrls: ['./user-consent.component.scss']
})
export class UserConsentComponent implements OnDestroy {

    private readonly launchUrl: string;
    pageContent = "Please wait...";
    consentText ="";
    showContent = false;
    disableAcceptButton = false;
    private _unsubscribeAll: Subject<any>;


    constructor(private readonly userConsentSandbox: UserConsentSandbox,
        private readonly router: Router, private readonly activatedRoute: ActivatedRoute,
        private configService: FusionConfigService,
        private userFacade: UserFacade
        ) {
            this.launchUrl = this.configService.get("authGuardSettings")?.launchUrl;
            this._unsubscribeAll = new Subject();
            this.configService.uiSettings = {
            layout: {

                navbar  : {
                    hidden: true
                },
                header : {
                    hidden: true
                },
                footer  : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.router.events.pipe(takeUntil(this._unsubscribeAll)).subscribe(event => {
            if ( event instanceof NavigationStart && event.navigationTrigger === "popstate" ) {
                this.userFacade.LogOut();
                window.location.reload();
            }
        });
    }

    ngOnInit() {
        const consentedAt = localStorage.getItem(MetaConstants.USER_CONSENT_LOCAL_STORAGE_KEY);
        if (consentedAt)
            this.router.navigateByUrl(this.launchUrl);
        else {

            this.userConsentSandbox.getConsentAgreeement().subscribe(data => {
                this.consentText = data.value;
                this.pageContent = "";
                this.showContent = true;
            });
        }
        this.configService.uiSettings = {
            layout: {
                navbar  : {
                    hidden: true
                },
                header : {
                    hidden: true
                },
                footer  : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    onAccepted(accepted: boolean) {
             if (accepted) {
            this.disableAcceptButton = true;
            this.userConsentSandbox.createConsent().subscribe(resp => {
               if (resp != null)
               {
                localStorage.setItem(MetaConstants.USER_CONSENT_LOCAL_STORAGE_KEY, resp.consentedAt);
               }
                // this.activatedRoute.queryParams.pipe(takeUntil(this._unsubscribeAll)).subscribe(params => {
                this.userFacade.UserState$.pipe(takeUntil(this._unsubscribeAll)).subscribe((userState)=> {
                    this.router.navigateByUrl(getLaunchUrl(userState));
                });
                // });
            });
        }
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
