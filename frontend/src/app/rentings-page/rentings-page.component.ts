import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './dialog/edit/edit.component';
import { RentingService } from '../services/renting.service';
import { UserService } from '../services/user.service';
import { Renting } from '../renting/renting.component';
import { User } from '../user-page/user-page.component';

@Component({
  selector: 'app-rentings-page',
  templateUrl: './rentings-page.component.html',
  styleUrls: ['./rentings-page.component.css']
})
export class RentingsPageComponent implements OnInit {
  rentings: Renting[] = []
  filter: any = { closed: undefined, user: undefined }
  queryParams: any;

  displayedColumns: string[] = [
    'userName',
    'movieTitle',
    'startingDate',
    'deadLine',
    'closed',
    'actions'
  ];

  listOfUsers: User[] = [];

  constructor(
    private api: RentingService,
    private userapi: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });

    if (this.queryParams.closed) {
      if (this.queryParams.closed == "true") {
        this.filter.closed = true;
      }
      else if (this.queryParams.closed == "false") {
        this.filter.closed = false;
      }
    }
    if (this.queryParams.user) {
      this.filter.user = this.queryParams.user;
    }

    this.getRentings();
    this.getUserList();
  }

  ngOnInit(): void {

  }

  getRentings = () => {
    this.api.getAllRentings(this.filter).subscribe(
      data => {
        this.rentings = data;
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

  getUserList = () => {
    this.userapi.getAllUser().subscribe(
      data => {
        this.listOfUsers = data;
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

  filterRentings = () => {
    let path = "/rentings-page/";
    this.getRentings();

    if (this.filter.closed !== undefined) {
      if (this.filter.closed) {
        path += "?closed=true";
      }
      else {
        path += "?closed=false";
      }
      if (this.filter.user !== undefined) {
        path += "&user=" + this.filter.user;
      }
    }
    else if (this.filter.user !== undefined) {
      path += "?user=" + this.filter.user;
    }

    this.location.go(path);
  }

  closeRenting = (renting: Renting) => {
    let dialogRef = this.dialog.open(EditComponent, {
      data: renting,
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getRentings();
    });
  }

}
