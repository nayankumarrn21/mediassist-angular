import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './components/layout/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PoliciesComponent } from './components/policy/policies/policies.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PolicyDialogComponent } from './components/policy/policy-dialog/policy-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PolicyAddDialogComponent } from './components/policy/policy-add-dialog/policy-add-dialog.component';
import { MatSelectModule } from '@angular/material/select';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UsersComponent } from './components/layout/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { UsercardComponent } from './components/users/usercard/usercard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserPoliciesComponent } from './components/users/user-policies/user-policies.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PoliciesComponent,
    PolicyDialogComponent,
    PolicyAddDialogComponent,
    RegisterUserComponent,
    UsersComponent,
    UsercardComponent,
    UserPoliciesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
