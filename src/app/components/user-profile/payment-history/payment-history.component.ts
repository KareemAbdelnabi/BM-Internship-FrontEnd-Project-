import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { PaymentHistoryService } from '../../../services/payment-history.service';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  token: string | null = null;
  paymentHistory: any[] = []; // Array to store the list of payment history transactions
  loading: boolean = false; // Loading state

  constructor(
    private paymentHistoryService: PaymentHistoryService,
    @Inject(PLATFORM_ID) private platformId: any,
    private snackBar: MatSnackBar // Inject MatSnackBar for notifications
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Get token from session storage in the browser
      this.token = sessionStorage.getItem('token');

      if (this.token) {
        this.fetchPaymentHistory();
      } else {
        console.error('Token not found');
      }
    }
  }

  fetchPaymentHistory(): void {
    if (this.token) {
      this.loading = true; // Set loading to true when request starts
      this.paymentHistoryService.getPaymentHistory(this.token).subscribe(
        response => {
          this.paymentHistory = response.content;
          this.loading = false;
          console.log('Payment history data:', this.paymentHistory);
        },
        error => {
          this.loading = false; // Set loading to false if an error occurs
          console.error('Error fetching payment history:', error);
        }
      );
    }
  }

  copyToClipboard(accountNumber: string): void {
    navigator.clipboard.writeText(accountNumber).then(() => {
      this.snackBar.open('Account number copied to clipboard!', 'Close', {
        duration: 2000
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
}
