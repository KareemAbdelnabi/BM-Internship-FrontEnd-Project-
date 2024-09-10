import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
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
export class NavbarComponent implements OnInit, OnDestroy {
  tokenExists: boolean = false;
  showDropdown: boolean = false;
  username: string = '';
  userId: string | null = null;
  dataLoaded: boolean = false;

  private storageEventListener: any;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure the token is checked when the page is refreshed
      this.checkToken();
      this.getUsernameAndId();

      // Listen for route changes and update the token and UI state accordingly
      this.router.events.subscribe(() => {
        this.checkToken();
        this.getUsernameAndId();
      });

      // Listen for storage changes (e.g., token added or removed)
      this.storageEventListener = window.addEventListener('storage', () => {
        this.checkToken();
        this.getUsernameAndId();
        this.dataLoaded = true;
      });

      // Mark data as loaded for the UI
      this.dataLoaded = true;
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.storageEventListener) {
      window.removeEventListener('storage', this.storageEventListener);
    }
  }

  // Check if the token exists in sessionStorage and update the tokenExists flag
  checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      // Check token in sessionStorage instead of localStorage
      const token = sessionStorage.getItem('token');
      this.tokenExists = !!token;  // True if token exists, otherwise false

      // Debugging: Log to check the token and its value
      console.log('Token Exists:', this.tokenExists, 'Token:', token);

      if (!this.tokenExists) {
        this.showDropdown = false;  // Hide the dropdown if no token is present
      }
    }
  }

  // Get the username and user ID from sessionStorage
  getUsernameAndId() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = sessionStorage.getItem('username') || '';
      this.userId = sessionStorage.getItem('id');

      // Debugging: Log to check the values of username and userId
      console.log('Username:', this.username, 'User ID:', this.userId);
    }
  }

  // Toggle the dropdown menu visibility if token exists
  toggleDropdown() {
    if (this.tokenExists) {
      this.showDropdown = !this.showDropdown;
    }
  }

  // Handle the logout logic
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      // Clear all data related to the user in sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('id');
      
      sessionStorage.clear();  // Optionally clear all session data

      // Reset the UI state
      this.tokenExists = false;
      this.username = '';
      this.userId = null;
      this.showDropdown = false;

      // Debugging: Log to confirm logout has been triggered
      console.log('User has logged out.');

      // Navigate to the login page
      this.router.navigate(['/login']);
    }
  }
}
