import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  register(newuser: any): Observable<any> {
    const body = newuser;
    return this.http.post(this.baseurl + "viewset/register/",
      body, { headers: this.httpHeaders });
  }
}
