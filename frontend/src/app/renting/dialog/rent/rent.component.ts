import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RentingService } from 'src/app/services/renting.service';
import { Renting } from '../../renting.component';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  newRenting: Renting = {
    id: -1,
    user: -1,
    movieInstance: this.data,
    deadLine: new Date(),
    closed: false
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private dialogRef: MatDialogRef<RentComponent>,
    private api: RentingService,
    private snackbar: MatSnackBar
  ) { }


  ngOnInit(): void {
    //console.log(this.data)
  }

  close = () => {
    this.dialogRef.close()
  }

  createRenting = () => {
    this.newRenting.movieInstance = this.data;

    this.api.rentMovie(this.newRenting).subscribe(
      data => {
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
}
