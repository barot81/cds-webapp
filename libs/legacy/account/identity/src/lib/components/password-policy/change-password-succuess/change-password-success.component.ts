import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FusionConfigService, UserFacade } from '@zhealthcare/fusion/core';

@Component({
    selector: 'change-password-success',
    templateUrl: 'change-password-success.component.html',
    styleUrls:['change-password-success.component.scss']
})

export class ChangePasswordSuccessComponent implements OnInit {
    constructor(private configService: FusionConfigService,
        private userFacade: UserFacade,
        private router: Router
        ) {
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

     }

    ngOnInit() { }

    backToLogin() {
        this.userFacade.LogOut();
        this.router.navigateByUrl('/account/login');
    }
}
