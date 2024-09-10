import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MobileappsharedComponent } from "../mobileappshared/mobileappshared.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, MobileappsharedComponent],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  hasToken: boolean = false;
  currentBalance: number = 10000;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.checkToken();
    this.router.events.subscribe(() => {
      this.checkToken();
    });
  }

  checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      this.hasToken = !!token;

      if (this.hasToken) {
        this.fetchCurrentBalance();
      }
    }
  }

  fetchCurrentBalance() {
    // Simulated fetching logic. Replace with actual API call
    this.currentBalance = 10000; // Example balance
  }

  get buttonLabel(): string {
    return this.hasToken ? 'Transfer Now' : 'Continue';
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}



// import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// // Assuming you have a service to handle authentication and user data
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss'
// })
// export class HomeComponent implements OnInit {
//   hasToken: boolean = false;
//   currentBalance: number = 0; // Initialize with 0

//   constructor(
//     private authService: AuthService,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {}

//   ngOnInit() {
//     this.checkToken();
//   }

//   checkToken() {
//     if (isPlatformBrowser(this.platformId)) {
//       this.hasToken = this.authService.isAuthenticated(); // Check if authenticated

//       if (this.hasToken) {
//         this.currentBalance = this.authService.getUserBalance(); // Fetch balance (replace with your logic)
//       }
//     }
//   }

//   get buttonLabel(): string {
//     return this.hasToken ? 'Transfer Now' : 'Continue';
//   }
// }
