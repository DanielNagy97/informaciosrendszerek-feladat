import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

  constructor(
    private router: Router,
  ) {
    if (localStorage.getItem('token') == undefined) {
      this.router.navigateByUrl('login');
    }
  }
  logout = () => {
    localStorage.clear();
    window.location.reload();
  }
}