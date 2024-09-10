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
  username: string | null = null;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.checkToken();
    this.getUsername();

    this.router.events.subscribe(() => {
      this.checkToken();
      this.getUsername();
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

  getUsername() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = localStorage.getItem('username');
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