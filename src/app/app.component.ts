import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MobileappsharedComponent } from './mobileappshared/mobileappshared.component';
import { LoginComponent } from './auth/login/login.component';
import { InactivityService } from './inactivity.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,NavbarComponent,FooterComponent,MobileappsharedComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private inactivityService: InactivityService) {}
  title = 'Speedo-Transfer';
}
