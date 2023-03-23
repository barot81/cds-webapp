import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { FusionConfigService, UserConsentSandbox } from '@zhealthcare/fusion/core';

@Component({
    selector: 'zhealthcare-agreement',
    templateUrl: './zhealthcare-agreement.component.html'
})
export class zhealthcareAgreementComponent {

    PageContent: any = "Please wait..";
    constructor(private readonly consentSandbox: UserConsentSandbox,
        private readonly  activatedroute: ActivatedRoute,
        private configService: FusionConfigService) {
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

    ngOnInit() {
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
        this.activatedroute.data.subscribe(data => {
            if (data?.id === "privacypolicy") {
                this.consentSandbox.getPrivacyPolicy().subscribe(res => {
                    this.updatePageContent(res);
                });
            }
            else if (data?.id === "termsofuse") {
                this.consentSandbox.getTermsOfUse().subscribe(res => {
                    this.updatePageContent(res);
                });
            }
            else {
                this.PageContent = "Error. please check if link is correct."
            }
        })
    }

    updatePageContent(res) {
        if (res != null)
            this.PageContent = res.value;
        else
            this.PageContent = "Some error. Please try again later."
    }

}

