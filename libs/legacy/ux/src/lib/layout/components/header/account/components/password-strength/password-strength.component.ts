import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { PasswordStrengthService } from '@zhealthcare/fusion/core';

/** Colors: this represent actually the state of the password�s strength. */
export enum Colors {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn',
}

/** five criteria for password validation   **/
@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.html',
})
export class PasswordStrengthComponent implements OnChanges {
  passwordFormControl: AbstractControl;
  private _color: string;
  externalError: boolean;

  @Input()
  password: string;

  @Output()
  onStrengthChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(public passwordStengthService: PasswordStrengthService) {
    this.passwordFormControl = new FormControl('', [
      ...this.passwordStengthService.validators.map((criteria) =>
        Validators.pattern(
          this.passwordStengthService.criteriaMap.get(criteria)
        )
      ),
    ]);
  }

  /**Every time the password changes, the strength will be calculated and emitted: */
  ngOnChanges(changes: SimpleChanges): void {
    this.passwordStengthService.password = this.password;
    if (changes.externalError && changes.externalError.firstChange) {
      this._color = Colors.primary;
      return;
    }
    if (changes.externalError && changes.externalError.currentValue) {
      this._color = Colors.warn;
      return;
    }
    this.password && this.password.length > 0
      ? this.passwordStengthService.getPasswordStrength()
      : this.passwordStengthService.reset();
    this.onStrengthChanged.next(this.passwordStengthService.strength);
  }

  get color(): string {
    if (this.passwordStengthService.strength <= 20) {
      return Colors.warn;
    } else if (this.passwordStengthService.strength <= 80) {
      return Colors.accent;
    } else {
      return Colors.primary;
    }
  }
}
