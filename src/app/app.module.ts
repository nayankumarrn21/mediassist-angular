import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './components/menus/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PoliciesComponent } from './components/policy/policies/policies.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PolicyDialogComponent } from './components/policy/policy-dialog/policy-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PolicyAddDialogComponent } from './components/policy/policy-add-dialog/policy-add-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './components/register-user/register-user.component';

import { MatTableModule } from '@angular/material/table';
import { UsercardComponent } from './components/users/usercard/usercard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserPoliciesComponent } from './components/users/user-policies/user-policies.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/menus/users/users.component';
import { MainPageComponent } from './components/layout/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PolicyEffects } from './store/policy/policy.effects';
import { policyReducer } from './store/policy/policy.reducer';
import { SessionTimerComponent } from './components/shared/session-timer/session-timer.component';
import { CustomCurrency } from './pipes/custom-currency-pipe';
import { UserFilterComponent } from './components/users/user-filter/user-filter.component';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserHomeComponent } from './components/users/user-home/user-home.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    HomeComponent,
    PoliciesComponent,
    PolicyDialogComponent,
    PolicyAddDialogComponent,
    RegisterUserComponent,
    UsercardComponent,
    UserPoliciesComponent,
    MainPageComponent,
    NotFoundComponent,
    SessionTimerComponent,
    CustomCurrency,
    UserFilterComponent,
    UserHomeComponent,
    UserProfileComponent,
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
    AsyncPipe,
    MatStepperModule,
    MatAutocompleteModule,
    StoreModule.forRoot({ auth: authReducer, policies: policyReducer }),
    EffectsModule.forRoot([AuthEffects, PolicyEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
