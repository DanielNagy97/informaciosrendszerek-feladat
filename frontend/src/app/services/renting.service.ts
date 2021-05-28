import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Renting } from '../renting/renting.component';

@Injectable({
  providedIn: 'root'
})
export class RentingService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Token " + localStorage.getItem("token")
  });

  constructor(private http: HttpClient) { }

  listInstancesOfaMovie(id: number, available: any = undefined): Observable<any> {
    let param = "?movie=" + id;
    if (available == true) {
      param += "&available=true";
    }
    else if (available == false) {
      param += "&available=false";
    }

    return this.http.get(this.baseurl + "viewset/movieInstance/" + param,
      { headers: this.httpHeaders });
  }

  listInstances(available: any = undefined): Observable<any> {
    let param = "";
    if (available == true) {
      param = "?available=true";
    }
    else if (available == false) {
      param += "?available=false";
    }

    return this.http.get(this.baseurl + "viewset/movieInstance/" + param,
      { headers: this.httpHeaders });
  }

  updateInstance(movie: any): Observable<any> {
    const body = movie;
    return this.http.put(this.baseurl + "viewset/movieInstance/" + movie.id + "/",
      body, { headers: this.httpHeaders });
  }

  createInstance(movie: any): Observable<any> {
    const body = movie;
    return this.http.post(this.baseurl + "viewset/movieInstance/",
      body, { headers: this.httpHeaders });
  }

  deleteInstance(id: any): Observable<any> {
    return this.http.delete(this.baseurl + "viewset/movieInstance/" + id + "/",
      { headers: this.httpHeaders });
  }

  rentMovie(newRenting: any): Observable<any> {
    let body = newRenting;
    body.user = localStorage.getItem("userID");
    body.deadLine = new Date(body.deadLine).toISOString().substring(0, 10);

    return this.http.post(this.baseurl + "viewset/renting/",
      body, { headers: this.httpHeaders });
  }

  getAllRentings(filter: any): Observable<any> {
    let queryParam = "";

    if (filter.closed !== undefined) {
      if (filter.closed) {
        queryParam += "?closed=true";
      }
      else {
        queryParam += "?closed=false";
      }
      if (filter.user !== undefined) {
        queryParam += "&user=" + filter.user;
      }
    }
    else if (filter.user !== undefined) {
      queryParam += "?user=" + filter.user;
    }

    return this.http.get(this.baseurl + "viewset/renting/" + queryParam,
      { headers: this.httpHeaders });
  }

  closeRenting(renting: Renting): Observable<any> {
    let body = renting;
    renting.closed = true;
    return this.http.put(this.baseurl + "viewset/renting/" + renting.id + "/",
      body, { headers: this.httpHeaders });
  }

}
