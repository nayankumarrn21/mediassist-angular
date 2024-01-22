import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  login(): void {
    console.log('Username:', this.username);
    console.log(
      'Password:',
      this.password + ' ' + this.getCurrentDateDDMMYYYY()
    );
    if (
      this.username === 'neudesic' &&
      this.password == this.getCurrentDateDDMMYYYY()
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
