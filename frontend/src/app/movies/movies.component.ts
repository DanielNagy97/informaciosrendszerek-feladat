import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../services/movie.service';
import { EditComponent } from './dialog/edit/edit.component';
import { DeleteComponent } from './dialog/delete/delete.component';

export interface Movie {
  id: number;
  title: string;
  director: string;
  storyLine: string;
  genre: string;
  releaseDate: Date;
  ageRating: number;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService]
})

export class MoviesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'director', 'genre', 'releaseDate', 'ageRating', 'actions'];

  movies: Movie[] = [];
  selectedMovie: Movie;

  id: string | null = "";
  constructor(
    private route: ActivatedRoute,
    private api: MovieService,
    public dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.getMovies();
    this.selectedMovie = {
      id: -1,
      title: '',
      director: '',
      storyLine: '',
      genre: '',
      releaseDate: new Date(),
      ageRating: 0
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });

    if (this.id != "") {
      this.getOneMovie();
    }
  }

  getMovies = () => {
    this.api.getAllMovies().subscribe(
      data => {
        this.movies = data;
      },
      error => {
        this.snackbar.open(error.error.detail, 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });
      }
    )
  }

  getOneMovie = () => {
    this.api.getOneMovie(this.id).subscribe(
      data => {
        this.startEdit(data);
      },
      error => {
        console.log(error);
        this.snackbar.open(error.error.detail, 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });

      }
    );
  }


  deleteMovie = (movie: Movie) => {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: movie,
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getMovies();
      this.selectedMovie = { id: -1, title: '', director: '', storyLine: '', genre: '', releaseDate: new Date(), ageRating: 0 };
    });
  }

  startEdit = (movie: Movie) => {
    let dialogRef = this.dialog.open(EditComponent, {
      data: movie,
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getMovies();
      this.selectedMovie = {
        id: -1,
        title: '',
        director: '',
        storyLine: '',
        genre: '',
        releaseDate: new Date(),
        ageRating: 0
      };
    });
  }

  navigateToInstances = (movieID: number) => {
    this.router.navigateByUrl('renting/?movie=' + movieID);
  }

}
