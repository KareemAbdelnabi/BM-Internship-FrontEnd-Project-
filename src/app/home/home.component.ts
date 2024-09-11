import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
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
  currentBalance: number = 0; 

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient 
  ) {}

  ngOnInit() {
    this.checkToken();
    this.router.events.subscribe(() => {
      this.checkToken();
    });
  }

  checkToken() {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      this.hasToken = !!token;
  
      if (this.hasToken && token) {  
        this.fetchCurrentBalance(token); 
      }
    }
  }

  fetchCurrentBalance(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
  
    this.http.get('https://moneytransferapplication-production.up.railway.app/users/id', { headers })
      .subscribe((response: any) => {
        if (response && response.accounts && response.accounts.length > 0) {
          this.currentBalance = response.accounts[0].balance;
        } else {
          console.error('No account information found in the API response.');
        }
      }, (error) => {
        console.error('Error fetching balance:', error);
      });
  }

  get buttonLabel1(): string {
    return this.hasToken ? 'Transfer Now' : 'Create An Account';
  }

  onButtonClick1() { 
    if (this.hasToken) {
      this.router.navigate(['/money-transfer']); 
    } else {
      this.router.navigate(['/register']); 
    }
  }
  
  get buttonLabel(): string {
    return this.hasToken ? 'Continue' : 'Continue';
  }

  onButtonClick() {
    if (this.hasToken) {
      this.router.navigate(['/money-transfer']); 
    } else {
      this.router.navigate(['/login']); 
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}
