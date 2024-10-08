import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkToken();
      this.getUsernameAndId();
      this.router.events.subscribe(() => {
        this.checkToken();
        this.getUsernameAndId();
      });

      this.storageEventListener = window.addEventListener('storage', () => {
        this.checkToken();
        this.getUsernameAndId();
        this.dataLoaded = true;
      });

      this.dataLoaded = true;
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.storageEventListener) {
      window.removeEventListener('storage', this.storageEventListener);
    }
  }

  checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      this.tokenExists = !!token;  

      if (!this.tokenExists) {
        this.showDropdown = false;  
      }
    }
  }

  getUsernameAndId() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = sessionStorage.getItem('username') || '';
      this.userId = sessionStorage.getItem('id');
    }
  }

  toggleDropdown() {
    if (this.tokenExists) {
      this.showDropdown = !this.showDropdown;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      // Clear session and local storage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('id');
      localStorage.removeItem('senderAccount');
      localStorage.removeItem('senderName');
      localStorage.removeItem('id');
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      // Call the API to log out
      this.http.post('https://moneytransferapplication-production.up.railway.app/auth/logout', {}, { headers, responseType: 'text' })
        .pipe(
          catchError(error => {
            console.error('Logout failed:', error);
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Logout successful:', response);  
  
          // Clear session storage
          sessionStorage.clear();
          
          // Reset component state
          this.tokenExists = false;
          this.username = '';
          this.userId = null;
          this.showDropdown = false;
  
          // Navigate to the login page
          this.router.navigate(['/login']);
        });
    }
  }
}
