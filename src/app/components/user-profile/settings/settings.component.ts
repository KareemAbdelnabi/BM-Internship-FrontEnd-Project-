import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/user-data.service'; // Import the service
import { HttpClientModule } from '@angular/common/http'; // Ensure HttpClientModule is imported

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
    private profileService: ProfileService // Inject the service
  ) {
    this.settingsForm = this.formBuilder.group({
      fullName: ['Loading...', Validators.required],
      country: ['Loading...', Validators.required],
      phone: ['', Validators.required],
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
      console.log(this.settingsForm.value);
      // You can send updated form data here if needed
    }
  }
}
