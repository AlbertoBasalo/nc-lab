import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (form: AbstractControl): { [key: string]: any } | null => {
    const password = form.get(controlName);
    const confirmPassword = form.get(matchingControlName);

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      console.log('password mismatch');
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  };
}
