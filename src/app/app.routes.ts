import { Routes } from '@angular/router';

// Import your components here
import { HomeComponent } from './home/home.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';
// import { MyAccountComponent } from './my-account/my-account.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/user-profile/settings/settings.component';
import { PaymentHistoryComponent } from './components/user-profile/payment-history/payment-history.component';
import { MyProfileComponent } from './components/user-profile/my-profile/my-profile.component';
import { ChangePasswordComponent } from './components/user-profile/change-password/change-password.component';
import { RegistrationFormComponent } from './auth/registration-form/registration-form.component';
import { ErrorComponent } from './error/error.component';
// import { RegisterComponent } from './register/register.component';
// import { NotFoundComponent } from './not-found/not-found.component'; // Assuming you have a 404 component


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'money-transfer', component: MoneyTransferComponent },
  // { path: 'my-account', component: MyAccountComponent },
  { path: 'help', component: HelpComponent },
  { path: 'login', component: LoginComponent },
  { path:'register', component: RegistrationFormComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    children: [
      { path: 'settings', component: SettingsComponent },
      { path: 'payments-history', component: PaymentHistoryComponent },
      { path:'my-profile', component: MyProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent }

    ]
  },
  //   { path: 'register', component: RegisterComponent },

  // Add more routes as needed for other parts of your application

     { path: '**', component: ErrorComponent }, // Wildcard route for handling 404s
];
