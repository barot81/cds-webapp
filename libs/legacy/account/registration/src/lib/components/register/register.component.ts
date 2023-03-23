import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, FusionConfigService, PasswordStrengthService } from '@zhealthcare/fusion/core';
import { TooltipDirective } from '@zhealthcare/ux';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Registration } from '../../models/registration.model';
import { RegistrationSandbox } from '../../registration.sandbox';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';

@Component({
  selector: 'registration-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit, OnDestroy {
  submitted: boolean;
  registration: Registration;
  userName: string;
  invitationkey: string;
  form: FormGroup;
  hide: any = false;
  hideRePassword: any = false;
  isLinkExpired = true;
  isPasswordStrong = false;
  checkForRequestSuccess = true;


  @ViewChildren(TooltipDirective) tooltipDirective;
  zhealthcareTooltip: any;
  toolTipOpened = new BehaviorSubject<boolean>(false);
  tooltipOptions = {
      'contentType': 'template',
      'placement': 'right',
      'trigger': 'click',
      'theme': 'light',
      'max-width': '450',
      'width': '377',
      'hide-delay': -1,
      'pointerEvents': 'auto'
  }

  notSame = false;
  validatePolicy = true;
  private _unsubscribe;

  constructor(
    public formbuilder: FormBuilder,
    private registrationSandbox: RegistrationSandbox,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private configService:FusionConfigService,
    private passwordStrengthService: PasswordStrengthService,
    private _snackBar: MatSnackBar

  ) {
    super();
    this._unsubscribe = new Subject();
    this.registration = new Registration();
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

    this.invitationkey = this.route.snapshot.queryParams['key'];
    this.registrationSandbox.getRegister(this.invitationkey).subscribe     (response=>  {
        this.userName = response.userName;
        this.isLinkExpired =  true;
      }, error => { this.isLinkExpired = false; } );
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

    this.form = this.formbuilder.group(
      {
        newPassword: ['', Validators.required],
        repeatNewPassword: ['', Validators.required],
        termsCondition: [true, Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );

    this.form.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(data=> {
      this.matchPassword(data);
    });
    // this.configService.uiSettings = {
    //   layout: {

    //       navbar  : {
    //           hidden: true
    //       },
    //       header : {
    //           hidden: true
    //       },
    //       footer  : {
    //           hidden: true
    //       },
    //       sidepanel: {
    //           hidden: true
    //       }
    //   }
    // };
  }

  matchPassword(data: any) {
    if (data.newPassword && data.newPassword !== "" &&
        data.repeatNewPassword && data.repeatNewPassword !== "" && data.newPassword !== data.repeatNewPassword &&
        this.form.controls.newPassword.touched &&
        this.form.controls.repeatNewPassword.touched) {
            this.notSame = true;
    } else {
        this.checkIsPasswordStrong();
        this.notSame = false;
    }
  }
  checkIsPasswordStrong() {
    const newPassword = this.form.controls.newPassword;
    const confirmPassword = this.form.controls.repeatNewPassword;
    if((newPassword.value && newPassword.value !=="" && newPassword.touched)
    ||
    (confirmPassword.value && confirmPassword.value !== "" &&
      confirmPassword.touched)) {
      const strength = this.passwordStrengthService.getPasswordStrength(newPassword.value);
      this.updatedPasswordStrength(strength);
      this.validatePolicy =  this.isPasswordStrong;
    }else {
        this.validatePolicy = true;
    }
  }

      // Function is to open tooltip
      openTooltip(id: any) {
        this.zhealthcareTooltip = this.tooltipDirective.find(elem => elem.id === id);
        if (this.tooltipDirective && this.tooltipDirective != null && this.tooltipDirective.length > 0) {
            const filteredTooltips: Array<any> = this.tooltipDirective
                .filter(x => x.createTimeoutId != null && x.id != this.zhealthcareTooltip.id);
            filteredTooltips.forEach(element => {
                element.destroyTooltip();
            });
        }

        this.toolTipOpened.next(true);
    }

     // Function will execute when user click outside of tooltip
     onOutsideClick() {
        if (this.zhealthcareTooltip && this.zhealthcareTooltip != null) {
            this.zhealthcareTooltip.destroyTooltip();
        }
        this.toolTipOpened.next(false);
      }

  submit() {
    this.registration.key = this.invitationkey;
    this.registration.password = this.form.controls['newPassword'].value;
    this.registration.confirmPassword = this.form.controls['repeatNewPassword'].value;
    this.isPasswordStrong = this.passwordStrengthService.isPasswordStrong(this.registration.password);
    if(this.isPasswordStrong) {
    this.registrationSandbox.register(this.registration).subscribe({
      next: () => { this.submitted = true; },
      error: () => {
        this.submitted = false;
        this.checkForRequestSuccess = false;
      },
    });
    } else {
      this._snackBar.open("Please enter strong password !", "OK", {
          duration: 5000,
      });
    }
  }
  updatedPasswordStrength($event) {
    if($event > 80) {
      this.isPasswordStrong = true;
    } else {
      this.isPasswordStrong = false;
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.controls.newPassword.value;
    const repeatNewPassword = group.controls.repeatNewPassword.value;
    return newPassword === repeatNewPassword ? null : { notSame: true };
  }

  openDialog() {
    this.dialog.open(TermsAndConditionsComponent,{
      width: '50vw'
    }
    );

  }
  close($event: any) {
    $event.returnValue = true;
  }

  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
