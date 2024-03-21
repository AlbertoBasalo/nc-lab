import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/shared/utils/form-validators.functions';

@Component({
  selector: 'lab-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: [''],
        acceptTerms: [false, Validators.requiredTrue],
      },
      { validators: matchValidator('password', 'confirmPassword') },
    );
  }

  onSubmit() {
    console.log(this.form.value);
    const credentials = { ...this.form.value };
    delete credentials.confirmPassword;
    console.log(credentials);
  }
}
