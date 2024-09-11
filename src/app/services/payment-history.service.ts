import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {
  private apiUrl = 'https://moneytransferapplication-production.up.railway.app/transactions';

  constructor(private http: HttpClient) {}

  getPaymentHistory(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiUrl}?page=1&size=1&sort=ASC`, { headers });
  }
}
