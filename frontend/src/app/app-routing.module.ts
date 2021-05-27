import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { RentingComponent } from './renting/renting.component';
import { UserPageComponent } from './user-page/user-page.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RentingsPageComponent } from './rentings-page/rentings-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'movies', redirectTo: 'movies/', pathMatch: 'full' },
  { path: 'movies/:id', component: MoviesComponent },

  { path: '', redirectTo: '/renting/', pathMatch: 'full' },
  { path: 'renting', redirectTo: 'renting/', pathMatch: 'full' },
  { path: 'renting/', component: RentingComponent },

  { path: 'user', component: UserPageComponent },

  { path: 'rentings-page', redirectTo: 'rentings-page/', pathMatch: 'full' },
  { path: 'rentings-page/:id', component: RentingsPageComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
