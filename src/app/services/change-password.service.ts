import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private baseUrl = 'https://moneytransferapplication-production.up.railway.app/users/';

  constructor(private http: HttpClient) {}

  changePassword(id: string, token: string, currentPassword: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}${id}/changepassword`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { currentPassword, newPassword };

    return this.http.put(url, body, { headers });
  }
}
