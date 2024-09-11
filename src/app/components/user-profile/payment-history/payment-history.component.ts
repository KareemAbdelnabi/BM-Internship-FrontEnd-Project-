import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { PaymentHistoryService } from '../../../services/payment-history.service';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  token: string | null = null;

  constructor(
    private paymentHistoryService: PaymentHistoryService,
    @Inject(PLATFORM_ID) private platformId: any
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
      this.paymentHistoryService.getPaymentHistory(this.token).subscribe(
        response => {
          console.log('Payment history data:', response);
        },
        error => {
          console.error('Error fetching payment history:', error);
        }
      );
    }
  }
}
