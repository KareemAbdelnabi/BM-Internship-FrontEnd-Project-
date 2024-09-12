import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';  // Import the service
import { ActivatedRoute } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  showLoggedOutMessage: boolean = false; // Property to control message visibility
  userCancelled: boolean = false; // Property to control if user cancelled

  // Inject the service, router, and route
  loginService = inject(LoginService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]]
    });
  }

  ngOnInit(): void {
    // Check if 'loggedOut' query parameter is present
    this.route.queryParams.subscribe(params => {
      this.showLoggedOutMessage = params['loggedOut'] === 'true';
    });
    this.route.queryParams.subscribe(params => {
      this.userCancelled = params['userCancelled'] === 'true';
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

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Use the login service to perform the login
    this.loginService.login(email, password).subscribe(
      (response: any) => {
        console.log('Login successful:', response);

        // Store token and username in session/local storage
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('username', response.username);
        localStorage.setItem('id', response.id);

        // Navigate to the home page after successful login
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed:', error);

        // Display appropriate toast notification based on error response
        if (error.error && error.error === 'Incorrect email or password') {
          // this.toastr.error('Incorrect email or password');
          this.snackBar.open('Incorrect email or password', 'Close', { duration: 5000 });
        } else {
          // this.toastr.error('Couldn\'t log in. Please try again later.');
          this.snackBar.open('Couldn\'t log in. Please try again later.', 'Close', { duration: 5000 });
        }
      }
    );
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onCloseClick() {
    this.router.navigate(['/home']);
  }

  onCloseIconClick() {
    this.userCancelled = false;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
