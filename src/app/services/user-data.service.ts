import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'https://moneytransferapplication-production.up.railway.app/users/test/';

  constructor(private http: HttpClient) {}

  getUserProfile(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}${id}`;
    return this.http.get(url, { headers });
  }
}
