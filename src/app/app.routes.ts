import { Routes } from '@angular/router';

// Import your components here
import { HomeComponent } from './home/home.component';
import { MoneyTransferComponent } from './money-transfer/money-transfer.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { HelpComponent } from './help/help.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { NotFoundComponent } from './not-found/not-found.component'; // Assuming you have a 404 component


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'money-transfer', component: MoneyTransferComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'help', component: HelpComponent }
  //   { path: 'login', component: LoginComponent },
  //   { path: 'register', component: RegisterComponent },

  // Add more routes as needed for other parts of your application

  //   { path: '**', component: NotFoundComponent }, // Wildcard route for handling 404s
];
