import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

export interface User {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user: User = {
    id: -1,
    username: "",
    first_name: "",
    last_name: "",
    email: ""
  };
  constructor(
    private api: UserService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.api.getUserData().subscribe(
      data => {
        this.user = data;
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
