import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  tokenExists: boolean = false;
  showDropdown: boolean = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.checkToken();

    this.router.events.subscribe(() => {
      this.checkToken();
    });
  }

  checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      this.tokenExists = !!token;

      if (!this.tokenExists) {
        this.showDropdown = false;
      }
    }
  }

  toggleDropdown() {
    if (this.tokenExists) {
      this.showDropdown = !this.showDropdown;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); 
    }
    this.router.navigate(['/login']); 
    this.showDropdown = false; 
  }
}

// import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule, NgIf } from '@angular/common';
// import { isPlatformBrowser } from '@angular/common';
// import { AuthService } from '../services/auth.service'; // Import the AuthService

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [RouterLink, CommonModule, NgIf],
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent implements OnInit {
//   tokenExists: boolean = false;
//   showDropdown: boolean = false;
//   username: string | null = null; // Variable to hold the username

//   constructor(
//     private router: Router,
//     private authService: AuthService, // Inject the AuthService
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {}

//   ngOnInit() {
//     this.checkToken();

//     this.router.events.subscribe(() => {
//       this.checkToken();
//     });
//   }

//   checkToken() {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = this.authService.getToken();
//       this.tokenExists = !!token;

//       if (this.tokenExists) {
//         this.username = this.authService.getUsername(); // Get username if token exists
//       } else {
//         this.showDropdown = false;
//       }
//     }
//   }

//   toggleDropdown() {
//     if (this.tokenExists) {
//       this.showDropdown = !this.showDropdown;
//     }
//   }

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//     this.showDropdown = false;
//   }
// }
