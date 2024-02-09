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
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public userService: UsersService,
    public store: Store<AuthState>
  ) {
    this.store.select(loggedInUser).subscribe((user) => {
      this.currentUser = user;
    });
  }

  login(): void {
    this.store.dispatch(
      AuthActions.login({ username: this.username, password: this.password })
    );

    console.log(this.currentUser);
    if (this.currentUser && this.currentUser.role == 'admin') {
      this.router.navigate(['/admin/home']);
    } else if (this.currentUser && this.currentUser.role == 'user') {
      this.router.navigate(['/user/home']);
    } else {
      this.snackBar.open('Please provide the correct credentials', '', {
        duration: 3000,
      });
    }
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
