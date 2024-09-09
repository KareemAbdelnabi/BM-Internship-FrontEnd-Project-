import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.settingsForm = this.formBuilder.group({
      fullName: ['kareem Smith', Validators.required],
      country: ['UK', Validators.required],
      phone: ['+880125412624', Validators.required],
      email: ['jhonathosnsmith@gmail.com', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.settingsForm.valid) {
      console.log(this.settingsForm.value);
    }
  }
}
