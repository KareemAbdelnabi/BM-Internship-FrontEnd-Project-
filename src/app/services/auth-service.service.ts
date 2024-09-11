import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Check if the user is authenticated by verifying the presence of a token in session storage
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!sessionStorage.getItem('token'); // Return true if the token exists
    }
    return false;
  }

  // Login and store the token in session storage
  login(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('token', token); // Store token in session storage
    }
  }

  // Logout and remove the token from session storage
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token'); // Remove token from session storage
    }
  }
}
