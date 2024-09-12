import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MobileappsharedComponent } from '../mobileappshared/mobileappshared.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-money-transfer',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavbarComponent,
    MobileappsharedComponent,
    FooterComponent,
  ],
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.scss'],
})
export class MoneyTransferComponent implements OnInit {
  step: number = 1;
  amount: number = 1000;
  recipientName: string = '';
  recipientAccount: string = '';
  senderName: string = '';
  senderAccount: string = '';
  showFavorites: boolean = false;

  favorites: any[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router // Inject the router

  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchSenderDetails();
      this.fetchFavorites();
    }
  }

  fetchSenderDetails() {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      const userId = localStorage.getItem('id');

      if (userId) {
        this.senderName = localStorage.getItem('senderName') || '';
        this.senderAccount = localStorage.getItem('senderAccount') || '';

        if (!this.senderName || !this.senderAccount) {
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
          });

          this.http
            .get(
              'https://moneytransferapplication-production.up.railway.app/users/id',
              { headers }
            )
            .subscribe(
              (response: any) => {
                if (
                  response &&
                  response.accounts &&
                  response.accounts.length > 0
                ) {
                  this.senderName = response.name;
                  this.senderAccount = response.accounts[0].accountNumber;

                  localStorage.setItem('senderName', this.senderName);
                  localStorage.setItem('senderAccount', this.senderAccount);
                } else {
                  console.error(
                    'No account information found in the API response.'
                  );
                }
              },
              (error) => {
                console.error('Error fetching sender details:', error);
              }
            );
        }
      } else {
        console.error('User ID not found in local storage.');
      }
    }
  }

  fetchFavorites() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('id');

      if (userId) {
        this.http
          .get(
            `https://moneytransferapplication-production.up.railway.app/users/${userId}/favorites`
          )
          .subscribe(
            (response: any) => {
              this.favorites = response;
            },
            (error) => {
              console.error('Error fetching favorites:', error);
            }
          );
      } else {
        console.error('User ID not found in local storage.');
      }
    }
  }

  nextStep() {
    if (this.step === 2) {
      if (this.validateTransferDetails()) {
        this.initiateTransfer();
      } else {
        console.error('Invalid transfer details.');
      }
    } else if (this.step < 3) {
      this.step++;
    }
  }

  validateTransferDetails(): boolean {
    return (
      this.recipientName !== '' &&
      this.recipientAccount !== '' &&
      this.amount > 0
    );
  }

  initiateTransfer() {
    if (isPlatformBrowser(this.platformId)) {
      const senderId = localStorage.getItem('id');
      const token = sessionStorage.getItem('token');

      if (senderId && token) {
        const transferData = {
          senderId: parseInt(senderId, 10),
          recipientName: this.recipientName,
          recipientAccountNumber: this.recipientAccount,
          amount: this.amount,
        };

        console.log('Transfer data:', transferData); // Debugging log

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        });

        this.http
          .post(
            'https://moneytransferapplication-production.up.railway.app/transfer',
            transferData,
            { headers }
          )
          .subscribe(
            (response: any) => {
              console.log('Transfer successful:', response);
              this.step++;
            },
            (error) => {
              console.error('Error during transfer:', error);
              if (error.error && error.error.message) {
                console.error('API error message:', error.error.message);
              }
            }
          );
      } else {
        console.error('Sender ID or token not found.');
      }
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  reset() {
    this.step = 1;
    this.amount = 1000;
    this.recipientName = '';
    this.recipientAccount = '';
    this.router.navigate(['/home']); // Navigate to home page

  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }

  selectFavorite(favorite: any) {
    this.recipientName = favorite.recipientName;
    this.recipientAccount = favorite.recipientAccountNumber;
    this.showFavorites = false;
  }

  addToFavourites() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('id');

      if (userId) {
        const favoriteData = {
          recipientName: this.recipientName,
          recipientAccountNumber: this.recipientAccount,
        };

        this.http
          .post(
            `https://moneytransferapplication-production.up.railway.app/users/${userId}/favorites`,
            favoriteData
          )
          .subscribe(
            (response: any) => {
              console.log('Favorite added successfully:', response);
              this.fetchFavorites();
            },
            (error) => {
              console.error('Error adding favorite:', error);
            }
          );
      } else {
        console.error('User ID not found in local storage.');
      }
    }
  }
}
