import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RentingService } from 'src/app/services/renting.service';
import { MovieInstance } from '../../renting.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MovieInstance,
    private dialogRef: MatDialogRef<DeleteComponent>,
    private api: RentingService,
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
    this.api.deleteInstance(this.data.id).subscribe(
      data => {

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

}
