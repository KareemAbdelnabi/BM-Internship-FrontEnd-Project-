import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTime: number = 120000; // 2 minutes in milliseconds
  private timer: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.resetTimer();
      this.setupInactivityListeners();
    }
  }

  // Set up event listeners for user activity
  private setupInactivityListeners(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('mousemove', () => this.resetTimer());
      window.addEventListener('mousedown', () => this.resetTimer());
      window.addEventListener('keypress', () => this.resetTimer());
      window.addEventListener('touchstart', () => this.resetTimer());
      window.addEventListener('scroll', () => this.resetTimer());
    }
  }

  // Reset the inactivity timer
  private resetTimer(): void {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.logoutUser();
    }, this.inactivityTime);
  }

  private logoutUser(): void {
    sessionStorage.removeItem('token'); // Clear the token
    sessionStorage.removeItem('username'); // Clear the user ID
    localStorage.removeItem('id'); // Clear the user ID
    localStorage.removeItem('senderName'); // Clear the token
    localStorage.removeItem('senderAccount'); // Clear the username
    this.router.navigate(['/login'], { queryParams: { loggedOut: true ,userCancelled: true } }); // Redirect to login page
  }

}
