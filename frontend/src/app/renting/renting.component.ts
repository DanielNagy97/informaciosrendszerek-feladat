import { Component, OnInit } from '@angular/core';
import { RentingService } from '../services/renting.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from '../services/movie.service';
import { EditComponent } from './dialog/edit/edit.component';
import { DeleteComponent } from './dialog/delete/delete.component';
import { RentComponent } from './dialog/rent/rent.component';
import { Movie } from '../movies/movies.component';


export interface MovieInstance {
  id: number,
  movie: number,
  movieTitle: string,
  format: string,
  price: number,
  isAvailable: boolean
}

export interface Renting {
  id: number,
  user: number,
  movieInstance: number,
  deadLine: Date,
  closed: boolean
}

@Component({
  selector: 'app-renting',
  templateUrl: './renting.component.html',
  styleUrls: ['./renting.component.css'],
  providers: [RentingService]
})

export class RentingComponent implements OnInit {

  availableMovies: MovieInstance[] = [];

  listOfMovies: Movie[] = [];
  filter: any = { movie: undefined, available: undefined };

  queryParams: any;

  constructor(
    private api: RentingService,
    private movieapi: MovieService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location,
    private snackbar: MatSnackBar
  ) {

    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });

    if (this.queryParams.available) {
      if (this.queryParams.available == "true") {
        this.filter.available = true;
      }
      else if (this.queryParams.available == "false") {
        this.filter.available = false;
      }
    }

    if (this.queryParams.movie) {
      this.filter.movie = this.queryParams.movie;
    }

    this.getInstances();

    this.getAllMovies();

  }

  ngOnInit(): void {

  }

  getInstances = () => {
    if (this.filter.movie) {
      this.getInstancesByMovieID(parseInt(this.filter.movie), this.filter.available);
    }
    else {
      this.getAvailable(this.filter.available);
    }
  }

  rentMovie = (movieID: number) => {
    let dialogRef = this.dialog.open(RentComponent, {
      data: movieID
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getInstances();
    });

  }

  filterInstances = () => {
    let path = "/renting/";

    if (this.filter.movie) {
      this.getInstancesByMovieID(parseInt(this.filter.movie), this.filter.available);
      path += "?movie=" + this.filter.movie;
      if (this.filter.available != undefined) {
        if (this.filter.available) {
          path += "&available=true";
        }
        else {
          path += "&available=false";
        }
      }
    }
    else {
      this.getAvailable(this.filter.available);
      if (this.filter.available != undefined) {
        if (this.filter.available) {
          path += "?available=true";
        }
        else {
          path += "?available=false";
        }
      }
    }
    this.location.go(path);
  }

  getInstancesByMovieID = (id: number, available: any = undefined) => {
    this.api.listInstancesOfaMovie(id, available).subscribe(
      data => {
        this.availableMovies = data;
      },
      error => {
        this.snackbar.open(error.error.detail, 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
  }

  getAllMovies = () => {
    this.movieapi.getAllMovies().subscribe(
      data => {
        this.listOfMovies = data;
      },
      error => {
        this.snackbar.open(error.error.detail, 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
  }

  getAvailable = (available: any = undefined) => {
    this.api.listInstances(available).subscribe(
      data => {
        this.availableMovies = data;
      },
      error => {
        this.snackbar.open(error.error.detail, 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
  }

  editInstance = (movie: MovieInstance) => {
    let dialogRef = this.dialog.open(EditComponent, {
      data: {
        movie: movie,
        listOfMovies: this.listOfMovies
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getInstances();
    });
  }

  newInstance = () => {
    let movie: MovieInstance = {
      id: -1,
      format: "",
      isAvailable: true,
      movie: -1,
      movieTitle: "",
      price: 0
    };
    let dialogRef = this.dialog.open(EditComponent, {
      data: {
        movie: movie,
        listOfMovies: this.listOfMovies
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getInstances();
    });
  }

  deleteInstance = (movie: MovieInstance) => {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: movie,
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getInstances();
    });
  }

}
