import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public userService: UsersService
  ) {}

  login(): void {
    let user = this.userService.getUser(this.username);
    if (
      user &&
      user.username == this.username &&
      user.password == this.password &&
      user.role == 'admin'
    ) {
      this.router.navigate(['/home']);
    } else {
      this.snackBar.open('Credentials are wrong', '', {
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
