import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdentitySandbox } from '../../../identity.sandbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SSOFormData } from '../models/formdata.model';
import { BaseComponent, FusionConfigService } from '@exxat/fusion/core';
import { UrlConstants } from '../models/constants';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'sso-request',
    templateUrl: './request.component.html'
  })
export class RequestComponent extends BaseComponent implements OnInit{
    isRequestProcessed: boolean = false;
    formData: SSOFormData;
    @ViewChild('myFormPost', {static: false}) myFormPost: ElementRef;
    constructor(private router: ActivatedRoute, private identitySandbox: IdentitySandbox,private _snackBar: MatSnackBar, private configService:FusionConfigService ) {
        super();
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
        }
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
      this.router.queryParams.subscribe((resp) => {
          if(window.location.host.toLowerCase().includes(UrlConstants.PlanUrlConstant))
            var redirectUrl = window.location.host;
          var providerName = resp.providerName;
          var userName = resp?.userName;
          if(providerName)
          {
              this.identitySandbox.getSAMLAuthRequest(providerName, userName, redirectUrl = '').subscribe(data => 
              {
                  this.isRequestProcessed = true;
                  this.formData = data;
              });
          }
        });
        this.openSnackBar("You'll be directed back to steps.exxat.com after logging in through University Account");
    }

    ngAfterViewChecked() {
        if (this.myFormPost && this.isRequestProcessed) {
          this.isRequestProcessed = false;
          this.myFormPost.nativeElement.submit();
        }
      }

      openSnackBar(message: string) {
        this._snackBar.open(message, null, {
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
}