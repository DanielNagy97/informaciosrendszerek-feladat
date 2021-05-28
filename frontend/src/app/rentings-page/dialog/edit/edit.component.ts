import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RentingService } from 'src/app/services/renting.service';
import { Renting } from 'src/app/renting/renting.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Renting,
    private dialogRef: MatDialogRef<EditComponent>,
    private api: RentingService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close();
  }

  submit = () => {
    this.closeRenting(this.data);
    this.close();
  }

  closeRenting = (renting: Renting) => {
    this.api.closeRenting(renting).subscribe(
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
