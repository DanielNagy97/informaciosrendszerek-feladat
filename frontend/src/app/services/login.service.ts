import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) { }

  aquireToken(user: any): Observable<any> {
    const body = {
      username: user.username,
      password: user.password
    };
    return this.http.post(this.baseurl + "api-token-auth/",
      body, { headers: this.httpHeaders });
  }
}
