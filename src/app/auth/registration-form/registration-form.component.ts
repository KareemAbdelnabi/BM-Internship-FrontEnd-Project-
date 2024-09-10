import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, RouterOutlet, HttpClientModule]
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  countries: string[] = ['Egypt','UK', 'USA', 'Canada', 'Australia', 'Germany', 'France', 'India', 'Japan', 'Brazil', 'Mexico', 'China', 'South Korea', 'Italy', 'Russia'];
  apiEndpoint = 'https://moneytransferapplication-production.up.railway.app/auth/register';

  router = inject(Router);
  http = inject(HttpClient);

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['UK', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    // Add the passwordStrengthValidator after the form is created
    this.registrationForm.get('password')?.setValidators([Validators.required, Validators.minLength(6), this.passwordStrengthValidator.bind(this)]); 
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
    const password = formGroup.get('password')?.value; // Use 'password' instead of 'registrationPassword'
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onCloseClick() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      // Format the dateOfBirth to match the API requirement (YYYY-MM-DD)
      const [year, month, day] = formData.dateOfBirth.split('-');
      formData.dateOfBirth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      // Make the API call
      this.http.post(this.apiEndpoint, formData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']); 
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle registration error (e.g., display error message)
        }
      );
    }
  }
}