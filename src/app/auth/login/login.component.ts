import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginObj: any = {
    "email": "",
    "password": ""
  }

  http = inject(HttpClient);
  router = inject(Router);

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]]
    });
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid = hasUpperCase && hasLowerCase && hasSpecialCharacter;

    return !isValid
      ? { passwordStrength: 'Password must contain at least one uppercase letter, one lowercase letter, and one special character.' }
      : null;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.loginObj = {
      email: email, 
      password: password 
    };

    console.log('Logging in with email:', email, 'and password:', password);

    this.http.post("https://moneytransferapplication-production.up.railway.app/auth/login", this.loginObj, { headers: headers }).subscribe(
      (response: any) => {
        console.log('Login successful:', response);

        // Store token and username in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);

        // Navigate to the desired route after successful login
        this.router.navigate(['/home']); 
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle login error (e.g., display error message)
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onCloseClick() {
    this.router.navigate(['/home']); 
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}