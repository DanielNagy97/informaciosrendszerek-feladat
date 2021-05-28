import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Token " + localStorage.getItem("token")
  });

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    return this.http.get(this.baseurl + "viewset/users/" + localStorage.getItem("userID") + "/",
      { headers: this.httpHeaders });
  }

  getAllUser(): Observable<any> {
    return this.http.get(this.baseurl + "viewset/users/",
      { headers: this.httpHeaders });
  }
}
