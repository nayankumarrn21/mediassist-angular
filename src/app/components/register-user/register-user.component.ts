import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  formGroup: any;
  workTypeList: string[] = [
    'Information Technology',
    'Doctor',
    'Agriculture',
    'Biotechnology',
    'Ecommerce',
  ];
  constructor(
    private router: Router,
    private userService: UsersService,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      phNumber: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      gender: new FormControl('Male', Validators.required),
      workType: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  addUser() {
    if (
      this.formGroup.status === 'VALID' &&
      this.formGroup.value.password != this.formGroup.value.confirmPassword
    ) {
      this.snackBar.open('password did not match', '', {
        duration: 3000,
      });
    } else if (this.formGroup.status === 'VALID') {
      const user: User = {
        username: this.formGroup.value.username,
        phNumber: this.formGroup.value.phNumber,
        fullName: this.formGroup.value.fullName,
        dob: this.formGroup.value.dob,
        gender: this.formGroup.value.gender,
        workType: this.formGroup.value.workType,
        password: this.formGroup.value.password,
        role: 'user',
      };
      this.userService.addUser(user);
      this.snackBar.open('User created successfully', '', {
        duration: 3000,
      });
      this.router.navigate(['/login']);
    }
  }
}
