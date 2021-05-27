import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RentingService } from 'src/app/services/renting.service';
import { MovieInstance } from '../../renting.component';
import { Movie } from 'src/app/movies/movies.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { movie: MovieInstance, listOfMovies: Movie[] },
    private dialogRef: MatDialogRef<EditComponent>,
    private api: RentingService,
    private snackbar: MatSnackBar
  ) { }


  ngOnInit(): void {
    //console.log(this.data)
  }

  close = () => {
    this.dialogRef.close()
  }

  updateInstance = () => {

    this.api.updateInstance(this.data.movie).subscribe(
      data => {
        this.data = data
        //console.log(data);
      },
      error => {
        //console.log(error);
        this.snackbar.open(error.error.detail, 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });

      }
    )
    this.close();

  }

  createInstance = () => {
    this.api.createInstance(this.data.movie).subscribe(
      data => {
        //console.log(data);
      },
      error => {
        console.log(error);
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
