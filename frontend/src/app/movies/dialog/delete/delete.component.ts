import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../movies.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private dialogRef: MatDialogRef<DeleteComponent>,
    private api: MovieService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close();
  }

  submit = () => {
    this.deleteMovie();
    this.close();
  }

  deleteMovie = () => {
    this.api.deleteMovie(this.data.id).subscribe(
      data => {
        //console.log(data);
      },
      error => {
        this.snackbar.open(error.error.detail, 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });
        //console.log(error);
      }
    )
  }

}
