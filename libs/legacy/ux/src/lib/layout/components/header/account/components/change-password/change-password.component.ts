import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FusionFormAdapter,
  FusionFormComponent
} from '@zhealthcare/fusion/components';
import { PasswordStrengthService, UserFacade } from '@zhealthcare/fusion/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LayoutService } from '../../../../../vertical/layout-1/layout-1.service';
import { DrawerService } from '../../../../drawer/drawer.service';
import { ManifoldPanelService } from '../../../../manifold-panel/manifold-panel.service';
import { SharedIdentitySandbox } from '../../services/identity.sandbox';
import { ChangePassword } from './ChangePassword';

export const enum SubmitBtnType {
  Verify,
  Change,
}
@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent
  extends FusionFormComponent
  implements OnInit, FusionFormAdapter, OnDestroy {
  isVisible = false;
  hideCurrentPwd = true;
  hideNewPwd = true;
  hideReNewPwd = true;
  submitBtnText = 'Verify';
  changePassword: ChangePassword;
  inValidPassword = false;
  loading = false;
  isPasswordStrong = false;
  notSame = false;
  validatePolicy = true;
  isFormValid = true;
  validPwd = '';
  private _unsubscribe;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private identitySandbox: SharedIdentitySandbox,
    private _snackBar: MatSnackBar,
    private drawerService: DrawerService,
    private _manifoldservice: ManifoldPanelService,
    private userFacade: UserFacade,
    private _layoutService: LayoutService,
    private passwordStrengthService: PasswordStrengthService
  ) {
    super();
    this._unsubscribe = new Subject();
    this.changePassword = new ChangePassword();
    this.userFacade.UserState$.pipe(take(1)).subscribe((x) => {
      this.changePassword.UserName = x?.user?.UserName;
    });
  }

  ngOnInit() {
    this.fusionFormGroup = this.fb.group(
      {
        currentPassword: [''],
        newPassword: [''],
        repeatNewPassword: [''],
      },
      { validator: this.passwordMatchValidator }
    );
    this._layoutService.isFormValid$.next(false);
    this._manifoldservice.managePrimaryActionStyle(true);
    this.fusionFormGroup.valueChanges
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((data) => {
        this.matchPassword(data);
        if (this.validPwd && this.validPwd === data.currentPassword) {
          this.isFormValid = true;
          this._manifoldservice.managePrimaryActionStyle(false);
        } else {
          this.isFormValid = false;
          this._manifoldservice.managePrimaryActionStyle(true);
        }
        this.updateLayoutFormValidity();
      });
  }

  private updateLayoutFormValidity() {
    if (
      this.fusionFormGroup.valid &&
      this.isPasswordStrong &&
      this.isFormValid
    ) {
      this._layoutService.isFormValid$.next(true);
      this._manifoldservice.managePrimaryActionStyle(false);
    } else {
      this._layoutService.isFormValid$.next(false);
      this._manifoldservice.managePrimaryActionStyle(true);
    }
  }

  primaryAction() {
    if (this.fusionFormGroup.invalid) {
      this._layoutService.isFormValid$.next(false);
      this._manifoldservice.managePrimaryActionStyle(true);
      this._layoutService.showPrimaryActionSpinner$.next(false);
      return;
    }

    this.loading = true;
    this.changePassword.CurrentPassword =
      this.fusionFormGroup.controls['currentPassword'].value;
    this.changePassword.NewPassword =
      this.fusionFormGroup.controls['newPassword'].value;
    this.identitySandbox.changePassword(this.changePassword).subscribe(
      (data) => {
        this.loading = false;

        this._snackBar.open(
          'Your password has been updated successfully!',
          'OK',
          {
            duration: 5000,
          }
        );
        this.drawerService.closeDrawer();
        this.router.navigate(['/account/login']);
      },
      (error) => {
        this.loading = false;
        this._snackBar.open(
          'Your password has been failed to reset!',
          'Error',
          {
            duration: 5000,
          }
        );
        console.log(error);
      }
    );
  }
  secondaryAction() { }

  updatedPasswordStrength($event) {
    if ($event > 80) {
      this.isPasswordStrong = true;
    } else {
      this.isPasswordStrong = false;
      this._layoutService.isFormValid$.next(false);
    }
  }
  verifyPassword() {
    this.changePassword.CurrentPassword =
      this.fusionFormGroup.controls['currentPassword'].value;
    if (this.changePassword.CurrentPassword !== '') {
      this.identitySandbox.verifyPassword(this.changePassword).subscribe(
        (data) => {
          this.loading = false;
          if (data) {
            this.validPwd =
              this.fusionFormGroup.controls['currentPassword'].value;
            this.submitBtnText = 'Update';
            this.isVisible = true;
            this.inValidPassword = false;
            this.isFormValid = true;
            this.updateLayoutFormValidity();
          }
        },
        (error) => {
          this.loading = false;
          this.isFormValid = true;
          this.inValidPassword = true;
        }
      );
    }
  }

  focusInput() {
    this.inValidPassword = false;
    this.isFormValid = false;
  }

  matchPassword(data: any) {
    if (
      data.newPassword &&
      data.newPassword !== '' &&
      data.repeatNewPassword &&
      data.repeatNewPassword !== '' &&
      data.newPassword !== data.repeatNewPassword &&
      this.fusionFormGroup.controls.newPassword.touched &&
      this.fusionFormGroup.controls.repeatNewPassword.touched
    ) {
      this.notSame = true;
    } else {
      this.checkIsPasswordStrong();
      this.notSame = false;
    }
  }
  checkIsPasswordStrong() {
    const newPassword = this.fusionFormGroup.controls.newPassword;
    const confirmPassword = this.fusionFormGroup.controls.repeatNewPassword;
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

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.controls.newPassword.value;
    const repeatNewPassword = group.controls.repeatNewPassword.value;
    return newPassword === repeatNewPassword ? null : { notSame: true };
  }

  panelClose() { }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
    this._unsubscribe.complete();
  }
}
