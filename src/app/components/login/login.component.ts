import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { loggedInUser } from '../../store/auth/auth.selector';
import { AuthState } from '../../store/auth/auth.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loggedInUser$: Observable<User | null>;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public userService: UsersService,
    public store: Store<AuthState>
  ) {
    this.loggedInUser$ = this.store.select(loggedInUser);
  }

  login(): void {
    this.store.dispatch(
      AuthActions.login({ username: this.username, password: this.password })
    );

    this.loggedInUser$.subscribe((user) => {
      console.log(user);
      if (user && user.role == 'admin') {
        this.router.navigate(['/admin/home']);
      } else {
        this.snackBar.open('Credentials are wrong', '', {
          duration: 3000,
        });
      }
    });
  }

  getCurrentDateDDMMYYYY(): string {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = day + month + year;

    return formattedDate;
  }
}
