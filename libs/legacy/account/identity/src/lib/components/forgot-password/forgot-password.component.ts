import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseComponent } from '@zhealthcare/fusion/core';
import { IdentitySandbox } from '../../identity.sandbox';
import { EmailOTPModel } from './EmailOTPModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LockOutDialogComponent } from '../account-lockout/lockoutdialog.component';
import { FusionConfigService } from '@zhealthcare/fusion/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LayoutService, SnackbarService, TooltipDirective } from '@zhealthcare/ux';
import { PasswordStrengthService } from '@zhealthcare/fusion/core';
import { takeUntil } from 'rxjs/operators';


export const enum VisiblityType {
  sendotp,
  verifyotp,
  enterpassword
}

/** newPassword and re-enter password must be equal */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//     const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
//     return (invalidCtrl || invalidParent);
//   }
// }
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'g-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  // currentBG = new BehaviorSubject<string>('assets/images/bg/1.jpg');
  // $currentBG = this.currentBG.asObservable();

  public form: FormGroup;
  @ViewChildren(TooltipDirective) tooltipDirective;
  zhealthcareTooltip: any;
  toolTipOpened = new BehaviorSubject<boolean>(false);
  tooltipOptions = {
    contentType: 'template',
    placement: 'right',
    trigger: 'click',
    theme: 'light',
    'max-width': '450',
    width: '377',
    'hide-delay': -1,
    pointerEvents: 'auto'
  };
  hidePassword = true;
  hideRePassword = true;
  loading = false;
  pageType = VisiblityType.sendotp;
  submitBtnText = 'Send One Time Password';
  OTPVeify = false;
  public userName = '';
  public emailOTPModel: EmailOTPModel;
  matcher;
  // matcher = new MyErrorStateMatcher();
  siteKey;
  captchaResponse: string;
  isPasswordStrong: boolean = false;
  private _unsubscribe;
  notSame = false;
  validatePolicy = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private identitySandbox: IdentitySandbox,
    private _matDialog: MatDialog,
    private configService: FusionConfigService,
    private _layoutService: LayoutService,
    private passwordStrengthService: PasswordStrengthService,
    private _snackBarService: SnackbarService
  ) {
    super();
    this._unsubscribe = new Subject();

    this.userName = this.route.snapshot.data['userName'];
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
  ngOnInit() {
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
    this.form = this.formBuilder.group(
      {
        email: [this.userName],
        OTP: [''],
        newPassword: [''],
        repeatNewPassword: ['']
      },
      { validator: this.passwordMatchValidator }
    );
    this.emailOTPModel = new EmailOTPModel();
    this.siteKey = this.configService.get('GoogleReCaptcha')['SiteKey'];
    this._layoutService.isFormValid$.next(false);
    this.form.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((data) => {
        this.matchPassword(data);
      });
  }

  matchPassword(data: any) {
    if (
      data.newPassword &&
      data.newPassword !== '' &&
      data.repeatNewPassword &&
      data.repeatNewPassword !== '' &&
      data.newPassword !== data.repeatNewPassword &&
      this.form.controls.newPassword.touched &&
      this.form.controls.repeatNewPassword.touched
    ) {
      this.notSame = true;
    } else {
      this.checkIsPasswordStrong();
      this.notSame = false;
    }
  }
  checkIsPasswordStrong() {
    const newPassword = this.form.controls.newPassword;
    const confirmPassword = this.form.controls.repeatNewPassword;
    if (
      (newPassword.value && newPassword.value !== '' && newPassword.touched) ||
      (confirmPassword.value &&
        confirmPassword.value !== '' &&
        confirmPassword.touched)
    ) {
      const strength = this.passwordStrengthService.getPasswordStrength(
        newPassword.value
      );
      this.updatedPasswordStrength(strength);
      this.validatePolicy = this.isPasswordStrong;
    } else {
      this.validatePolicy = true;
    }
  }

  updatedPasswordStrength($event) {
    if ($event > 80) {
      this.isPasswordStrong = true;
    } else {
      this.isPasswordStrong = false;
    }
  }

  // Function is to open tooltip
  openTooltip(id: any) {
    this.zhealthcareTooltip = this.tooltipDirective.find((elem) => elem.id === id);
    if (
      this.tooltipDirective &&
      this.tooltipDirective != null &&
      this.tooltipDirective.length > 0
    ) {
      let filteredTooltips: Array<any> = this.tooltipDirective.filter(
        (x) => x.createTimeoutId != null && x.id != this.zhealthcareTooltip.id
      );
      filteredTooltips.forEach((element) => {
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

  // ngAfterViewInit() {
  //   var i = 1;
  //   setInterval(() => {
  //     let images = [
  //       'assets/images/bg/1.jpg',
  //       'assets/images/bg/2.jpg',
  //       'assets/images/bg/3.jpg'
  //     ];
  //     this.currentBG.next(images[i]);
  //     i = i + 1;
  //     if (i == images.length) {
  //       i = 0;
  //     }
  //   }, 2000);
  // }

  public resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }
  /** function for password strength calculation  */

  /** function for password-matching */
  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.controls.newPassword.value;
    const repeatNewPassword = group.controls.repeatNewPassword.value;
    return newPassword === repeatNewPassword ? null : { notSame: true };
  }
  cancel() {
    this.router.navigate(['/account/login']);
  }
  resendOTP() {
    this.emailOTPModel.Email = this.form.controls['email'].value;
    this.sendOTP();
  }

  sendOTP() {
    if (!this.verifyCaptchaResponse()) return;

    this.emailOTPModel.CaptchaResponse = this.captchaResponse;

    this.identitySandbox.sendOTP(this.emailOTPModel).subscribe(
      (data) => {
        this.loading = false;
        this._snackBarService.openCustomSnackBar(
          {
            message:
              'One Time Password has been sent to your registered Email Address Successfully!'
          },
          5000,
          '',
          'bottom'
        );
        this.submitBtnText = 'Verify One Time Password';
        this.pageType = VisiblityType.verifyotp;
        this.resetCaptcha();
      },
      (error) => {
        this.resetCaptcha();
        this.loading = false;
        this._snackBarService.openCustomSnackBar(
          {
            message:
              'Entered email Address is invalid or you have sent too many One Time Password request!'
          },
          5000,
          '',
          'bottom'
        );
      }
    );
  }

  verifyOTP() {
    if (!this.verifyCaptchaResponse()) return;

    this.identitySandbox.verifyOTP(this.emailOTPModel).subscribe(
      (data) => {
        this.loading = false;
        if (data.isOTPVerified) {
          this.submitBtnText = 'Submit';
          this.pageType = VisiblityType.enterpassword;
        } else if (data.userOTPAttempts >= 3) {
          this._matDialog.open(LockOutDialogComponent, {
            width: '40%',
            data: data
          });
        } else {
          this._snackBarService.openCustomSnackBar(
            { message: 'Entered One Time Password is invalid!' },
            5000,
            '',
            'bottom'
          );
        }
        this.resetCaptcha();
      },
      (error) => {
        this.loading = false;
        this.resetCaptcha();
        this._snackBarService.openCustomSnackBar(
          {
            message:
              'One Time Password verification process failed due to bad data input!'
          },
          5000,
          '',
          'bottom'
        );
      }
    );
  }

  resetPassword() {
    if (!this.verifyCaptchaResponse()) return;

    this.identitySandbox.resetPassword(this.emailOTPModel).subscribe(
      (data) => {
        this.loading = false;
        if (data) {
          this._snackBarService.openCustomSnackBar(
            { message: 'Your password has been reset successfully!' },
            5000,
            '',
            'bottom'
          );
          this.router.navigate(['/account/login']);
        }
      },
      (error) => {
        this.loading = false;
        this._snackBarService.openCustomSnackBar(
          { message: 'Your password reset failed!' },
          5000,
          '',
          'bottom'
        );
      }
    );
  }

  btnAction() {
    this.loading = true;
    this.emailOTPModel.Email = this.form.controls['email'].value;
    if (this.pageType === VisiblityType.sendotp && this.emailOTPModel.Email) {
      this.sendOTP();
    } else if (this.pageType === VisiblityType.verifyotp) {
      this.emailOTPModel.OTP = this.form.controls['OTP'].value;
      this.verifyOTP();
    } else {
      this.emailOTPModel.Password = this.form.controls['newPassword'].value;
      if (this.passwordStrengthService.strength > 80) {
        this.resetPassword();
      } else {
        this._snackBarService.openCustomSnackBar(
          { message: 'Please Enter Strong Password!!' },
          5000,
          '',
          'bottom'
        );
      }
    }
  }
  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }

  verifyCaptchaResponse(): boolean {
    if (this.captchaResponse === undefined || this.captchaResponse === null) {
      this.loading = false;
      this._snackBarService.openCustomSnackBar(
        { message: 'Please Enter Valid Captcha!' },
        4000,
        '',
        'bottom'
      );
      return false;
    } else return true;
  }

  resetCaptcha(): void {
    grecaptcha.reset();
    this.captchaResponse = null;
  }
}
