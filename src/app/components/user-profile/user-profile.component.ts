import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { MobileappsharedComponent } from '../../mobileappshared/mobileappshared.component';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterOutlet, MyProfileComponent, PaymentHistoryComponent, SettingsComponent, ChangePasswordComponent, NavbarComponent, FooterComponent, MobileappsharedComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

}
