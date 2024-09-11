import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from '../../../services/change-password.service'; // Import the service
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private changePasswordService: ChangePasswordService,private toastr: ToastrService) {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.passwordForm.valid) {
      const id = localStorage.getItem('id');
      const token = sessionStorage.getItem('token');

      if (id && token) {
        const currentPassword = this.passwordForm.value.currentPassword;
        const newPassword = this.passwordForm.value.newPassword;

        // Use the service to handle the password change
        this.changePasswordService.changePassword(id, token, currentPassword, newPassword).subscribe(
          response => {
            console.log('Password changed successfully:', response);
            this.toastr.success('Password changed successfully!','Success');
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
