import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  user = { username: "", password: "" };
  constructor(
    private api: LoginService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {

    if (localStorage.getItem('token') != undefined) {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {

  }

  aquireToken = () => {
    this.api.aquireToken(this.user).subscribe(
      data => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userID", data.id);

        window.location.reload();
      },
      error => {
        this.snackbar.open(JSON.stringify(error.error), 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });
      }
    )
  }

  register = () => {
    this.router.navigateByUrl('register');
  }

}
