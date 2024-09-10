import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.passwordForm.valid) {
      // Retrieve id from local storage
      const id = localStorage.getItem('id');

      // Retrieve token from session storage
      const token = sessionStorage.getItem('token');

      if (id && token) {
        // Define the URL and headers
        const url = `https://moneytransferapplication-production.up.railway.app/users/${id}/changepassword`;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        // Prepare the body for the POST request
        const body = {
          currentPassword: this.passwordForm.value.currentPassword,
          newPassword: this.passwordForm.value.newPassword
        };

        // Send POST request
        this.http.put(url, body, { headers }).subscribe(
          response => {
            console.log('Password changed successfully:', response);
          },
          error => {
            console.error('Error changing password:', error);
          }
        );
      } else {
        console.error('ID or token not found');
      }
    }
  }
}
