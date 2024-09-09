import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, RouterOutlet]
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  countries: string[] = ['Egypt','UK', 'USA', 'Canada', 'Australia', 'Germany', 'France', 'India', 'Japan', 'Brazil', 'Mexico', 'China', 'South Korea', 'Italy', 'Russia'];


  router = inject(Router); // Inject the Router service


  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      registrationEmail: ['', [Validators.required, Validators.email]],
      country: ['UK', Validators.required],
      registrationPassword: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordStrengthValidator(control: any) {
    const password = control.value;
    if (!password) return null;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 6;

    return hasUpperCase && hasLowerCase && hasSpecialChar && isValidLength
      ? null
      : { passwordStrength: 'Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, and one special character.' };
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('registrationPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onCloseClick() {
    this.router.navigate(['/home']); // Navigate to the home page
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      // Handle form submission
    }
  }
}
