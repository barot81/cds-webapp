import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, FusionConfigService, PasswordStrengthService, UserInfo } from '@zhealthcare/fusion/core';
import { TooltipDirective } from '@zhealthcare/ux';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IdentitySandbox } from '../../identity.sandbox';
import { ChangePassword, SharedIdentitySandbox } from '@zhealthcare/ux';
import { passwordMatchValidator } from './password-match-validator';

@Component({
  selector: 'account-password-policy',
  templateUrl: './password-policy.component.html',
  styleUrls: ['./password-policy.component.scss']
})
export class PasswordPolicyComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  isFormValid = false;
  changePassword: ChangePassword;
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
  hidePassword = true;
  hideRePassword = true;
  notSame: boolean = false;
  validatePolicy: boolean = true;
  userInfo: UserInfo;
  userName = '';
  private _unsubscribe;
  public isPasswordStrong = true;

  constructor(
        private readonly _fb: FormBuilder,
        private configService: FusionConfigService,
        private passwordStrengthService: PasswordStrengthService,
        private identitySandbox:IdentitySandbox,
        private sharedIdentitySandbox:SharedIdentitySandbox,
        private _snackBar: MatSnackBar,
        private router: Router,
        private authService: AuthService
     ) {

        this._unsubscribe = new Subject();
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
        this.userInfo = this.authService.getUserInfo();
        if(this.userInfo && (this.userInfo.lastName || this.userInfo.firstName)) {
            this.userName = this.userInfo.lastName != undefined ? this.userInfo.lastName  + ', '  + this.userInfo.firstName: this.userInfo.firstName;
        }
        localStorage.setItem("pwdChanged","false");
        this.changePassword = new ChangePassword();
        this.changePassword.UserName = this.userInfo.userName;
        this.changePassword.CurrentPassword = this.userInfo.password;
    }


    ngOnInit() {
        this.initForm();
        this.loginForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(data=> {
            this.matchPassword(data);
        });
        // this.loginForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(value=> {
        //     if(value.currentPassword !== "" && value.newPassword !== "" && value.repeatNewPassword !== "" && value.newPassword === value.repeatNewPassword && this.passwordStrengthService.strength > 80) {

        //     } else {
        //         this.isFormValid =  false;
        //     }
        // });

    }

    matchPassword(data: any) {
        if (data.newPassword && data.newPassword !== "" &&
            data.confirmPassword && data.confirmPassword !== "" && data.newPassword !== data.confirmPassword &&
            this.loginForm.controls.newPassword.touched &&
            this.loginForm.controls.confirmPassword.touched) {
                this.notSame = true;
        } else {
            this.checkIsPasswordStrong();
            this.notSame = false;
        }
    }
    checkIsPasswordStrong() {
        const newPassword = this.loginForm.controls.newPassword;
        const confirmPassword = this.loginForm.controls.confirmPassword;
        if((newPassword.value && newPassword.value !=="" && newPassword.touched) ||
        (confirmPassword.value && confirmPassword.value !== "" &&
          confirmPassword.touched)) {
            const strength = this.passwordStrengthService.getPasswordStrength(newPassword.value);
            this.updatedPasswordStrength(strength);
            this.validatePolicy =  this.isPasswordStrong;
        }else {
            this.validatePolicy = true;
        }
    }

    private initForm() {
        this.loginForm = this._fb.group(
            {
                newPassword: ['',Validators.required],
                confirmPassword: ['',Validators.required]
            },
            { validator: [passwordMatchValidator] }
        )
    }

    passwordPolicyValidator(password: string, pwdStrengthService: PasswordStrengthService) {
        return pwdStrengthService.isPasswordStrong(password) ? null : { notStrong : true};
    }
    //#region [Tooltip Handlers]

    // Function is to open tooltip
    openTooltip(id: any) {
        this.zhealthcareTooltip = this.tooltipDirective.find(elem => elem.id === id);
        if (this.tooltipDirective && this.tooltipDirective != null && this.tooltipDirective.length > 0) {
            let filteredTooltips: Array<any> = this.tooltipDirective
                .filter(x => x.createTimeoutId != null && x.id != this.zhealthcareTooltip.id);
            filteredTooltips.forEach(element => {
                element.destroyTooltip();
            });
        }

        this.toolTipOpened.next(true);
    }

    updatedPasswordStrength($event) {
        if($event > 80) {
          this.isPasswordStrong = true;
        } else {
          this.isPasswordStrong = false;
        }
    }

    onClickChangePassword() {

        this.changePassword.NewPassword = this.loginForm.controls['newPassword'].value;
        this.isPasswordStrong = this.passwordStrengthService.isPasswordStrong(this.changePassword.NewPassword);
        if(this.isPasswordStrong) {
            this.sharedIdentitySandbox.changePassword(this.changePassword).subscribe(
                (data) => {
                this.loading = false;
                //  this.updateRefArea(this.accountNavigationService.getEventItemOfAccount());
                this._snackBar.open("Your password has been updated successfully!", "OK", {
                    duration: 5000,
                })
                this.authService.removeUserInfo();
                localStorage.removeItem('pwdChanged');
                this.router.navigate(["/account/changePasswordSuccess"]);
                },
                (error) => {
                this.loading = false;
                this._snackBar.open("Your password has been failed to reset!", "Error", {
                    duration: 5000,
                })
            });
        } else {
            this._snackBar.open("Please enter strong password !", "OK", {
                duration: 5000,
            });
        }
    }

    // Function will execute when user click outside of tooltip
    onOutsideClick() {
        if (this.zhealthcareTooltip && this.zhealthcareTooltip != null) {
            this.zhealthcareTooltip.destroyTooltip();
        }
        this.toolTipOpened.next(false);
    }

    //#endregion


    ngOnDestroy() {
        this._unsubscribe.next(true);
        this._unsubscribe.complete();
    }
}
