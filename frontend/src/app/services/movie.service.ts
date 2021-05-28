import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Token " + localStorage.getItem("token")
  });

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    return this.http.get(this.baseurl + "viewset/movie/",
      { headers: this.httpHeaders });
  }

  getOneMovie(id: any): Observable<any> {
    return this.http.get(this.baseurl + "viewset/movie/" + id + "/",
      { headers: this.httpHeaders });
  }

  updateMovie(movie: any): Observable<any> {
    const body = {
      title: movie.title,
      director: movie.director,
      storyLine: movie.storyLine,
      genre: movie.genre,
      releaseDate: new Date(movie.releaseDate).toISOString().substring(0, 10),
      ageRating: movie.ageRating
    };
    return this.http.put(this.baseurl + "viewset/movie/" + movie.id + "/",
      body, { headers: this.httpHeaders });
  }

  createMovie(movie: any): Observable<any> {
    const body = {
      title: movie.title,
      director: movie.director,
      storyLine: movie.storyLine,
      genre: movie.genre,
      releaseDate: new Date(movie.releaseDate).toISOString().substring(0, 10),
      ageRating: movie.ageRating
    };

    return this.http.post(this.baseurl + "viewset/movie/",
      body, { headers: this.httpHeaders });
  }

  deleteMovie(id: any): Observable<any> {
    return this.http.delete(this.baseurl + "viewset/movie/" + id + "/",
      { headers: this.httpHeaders });
  }
}
