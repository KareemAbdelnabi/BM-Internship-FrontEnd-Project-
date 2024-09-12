import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient and HttpHeaders
import { HttpClientModule } from '@angular/common/http'; // Ensure HttpClientModule is imported
import { ProfileService } from '../../../services/user-data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [ReactiveFormsModule, HttpClientModule], // Add HttpClientModule to imports
  standalone: true
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService, // Inject the service to get profile data
    private http: HttpClient, // Inject HttpClient to make API requests
    private toastr: ToastrService // Inject ToastrService for notifications
  ) {
    this.settingsForm = this.formBuilder.group({
      fullName: ['Loading...', Validators.required],
      country: ['Loading...', Validators.required],
      email: ['Loading...', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    if (this.isBrowser()) {
      this.loadUserProfile();
    }
  }

  loadUserProfile(): void {
    const id = localStorage.getItem('id'); // Get user ID from local storage
    const token = sessionStorage.getItem('token'); // Get token from session storage

    if (id && token) {
      this.profileService.getUserProfile(id, token).subscribe(
        (response) => {
          // Populate the form with the retrieved data
          this.settingsForm.patchValue({
            fullName: response.name,
            country: response.country,
            phone: response.phone,
            email: response.email
          });
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('User ID or token is missing');
    }
  }

  // Helper function to check if code is running in the browser
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      const token = sessionStorage.getItem('token');
      const id = localStorage.getItem('id');

      if (token && id) {
        const url = `https://moneytransferapplication-production.up.railway.app/users/${id}`;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        const body = {
          username: this.settingsForm.get('fullName')?.value,
          email: this.settingsForm.get('email')?.value,
          country: this.settingsForm.get('country')?.value
        };

        this.http.put(url, body, { headers }).subscribe(
          (response) => {
            console.log('Profile updated successfully', response);
            this.toastr.success('Profile updated successfully!');
          },
          (error) => {
            console.error('Error updating profile:', error);
            this.toastr.error('Error updating profile. Please try again later.');
          }
        );
      } else {
        console.error('Token or user ID is missing');
      }
    } else {
      // Log invalid fields and their errors
      Object.keys(this.settingsForm.controls).forEach(key => {
        const controlErrors = this.settingsForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Field: ${key}, Errors: `, controlErrors);
          this.toastr.error(`Field: ${key} is invalid`);
        }
      });
      console.error('Form is invalid');
      this.toastr.error('Please fill in all required fields');
    }
  }
}
