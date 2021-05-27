import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  newuser = {
    username: "",
    password: "",
    password2: "",
    email: "",
    first_name: "",
    last_name: ""
  }
  constructor(
    private api: RegisterService,
    private snackbar: MatSnackBar,
    private router: Router
    ) {
      if(localStorage.getItem('token') != undefined){
        this.router.navigateByUrl('');
      }
    }

  ngOnInit(): void {
  }

  register = () => {
    //console.log("register")

    this.api.register(this.newuser).subscribe(
      data => {
        //Setting the user token according to login...
        //vagy átirányítás
        //console.log(data)
        window.location.reload();
      },
      error => {
        this.snackbar.open(JSON.stringify(error.error), 'OK', {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000
        });
        //console.log(error);
      }
    )

  }

}
