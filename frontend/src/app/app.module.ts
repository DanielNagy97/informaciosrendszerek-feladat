import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { RentingComponent } from './renting/renting.component';
import { MoviesComponent } from './movies/movies.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { EditComponent as EditMovieComponent } from './movies/dialog/edit/edit.component';
import { DeleteComponent as DeleteMovieComponent } from './movies/dialog/delete/delete.component';
import { EditComponent as EditMovieInstanceComponent } from './renting/dialog/edit/edit.component';
import { DeleteComponent as DeleteMovieInstanceComponent } from './renting/dialog/delete/delete.component';
import { RentComponent } from './renting/dialog/rent/rent.component';
import { RentingsPageComponent } from './rentings-page/rentings-page.component';
import { EditComponent as EditRentingComponent } from './rentings-page/dialog/edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserPageComponent,
    RentingComponent,
    MoviesComponent,
    RegisterComponent,
    PageNotFoundComponent,
    EditMovieComponent,
    DeleteMovieComponent,
    RentComponent,
    EditMovieInstanceComponent,
    DeleteMovieInstanceComponent,
    RentingsPageComponent,
    EditRentingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
