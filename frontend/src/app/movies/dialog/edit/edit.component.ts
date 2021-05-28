import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../movies.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: []
})
export class EditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private dialogRef: MatDialogRef<EditComponent>,
    private api: MovieService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  close = () => {
    this.dialogRef.close();
  }

  updateMovie = () => {
    this.api.updateMovie(this.data).subscribe(
      data => {
        this.data = data;
      },
      error => {
        this.snackbar.open(error.error.detail, 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });
      }
    )
    this.close();
  }

  createMovie = () => {
    this.api.createMovie(this.data).subscribe(
      data => {

      },
      error => {
        this.snackbar.open(error.error.detail, 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });
      }
    )
    this.close();
  }

}
