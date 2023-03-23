import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(group: FormGroup) {
    const newPassword = group.controls.newPassword.value;
    const confirmPassword = group.controls.confirmPassword.value;
    return newPassword === confirmPassword ? null : { notSame: true };
}

