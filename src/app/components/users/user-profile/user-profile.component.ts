import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounce,
  debounceTime,
  fromEvent,
  interval,
  startWith,
  tap,
  timer,
} from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { Store } from '@ngrx/store';
import { User } from '../../../interfaces/user';
import { loggedInUser } from '../../../store/auth/auth.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements AfterViewInit {
  selectedFile: string | ArrayBuffer | null = null;

  imageUrl: string | null = null;

  @ViewChild('profilePlaceHolder', { read: ElementRef })
  profilePlaceHolder!: ElementRef<HTMLButtonElement>;

  onFileSelected(event: any) {
    console.log('onFileSelected', event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      console.log(this.imageUrl);
    };
    reader.readAsDataURL(file);
  }

  disabled = true;
  workTypeList: string[] = [
    'Information Technology',
    'Doctor',
    'Agriculture',
    'Biotechnology',
    'Ecommerce',
  ];
  formGroup: any;
  loggenInUser: User | null = null;
  constructor(
    private router: Router,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private store: Store<User>
  ) {
    this.store.select(loggedInUser).subscribe((user) => {
      this.loggenInUser = user;
    });
    this.formGroup = new FormGroup({
      username: new FormControl(
        this.loggenInUser?.username,
        Validators.required
      ),
      phNumber: new FormControl(
        this.loggenInUser?.phNumber,
        Validators.required
      ),
      fullName: new FormControl(
        this.loggenInUser?.fullName,
        Validators.required
      ),
      dob: new FormControl(this.loggenInUser?.dob, Validators.required),

      gender: new FormControl(this.loggenInUser?.gender, Validators.required),
      workType: new FormControl(
        this.loggenInUser?.workType,
        Validators.required
      ),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
    if (this.loggenInUser) {
      this.imageUrl = localStorage.getItem(this.loggenInUser.username)
        ? localStorage.getItem(this.loggenInUser.username)
        : null;
    }
  }

  ngAfterViewInit() {
    this.profilePlaceHolder.nativeElement.innerText =
      this.loggenInUser?.username.substring(0, 2).toUpperCase() || '';
  }

  formSubmit() {
    console.log('Inside the Add User Method');
    if (
      this.formGroup.status === 'VALID' &&
      this.formGroup.value.password &&
      this.formGroup.value.password != this.formGroup.value.confirmPassword
    ) {
      this.snackBar.open('password did not match', '', {
        duration: 3000,
      });
      return;
    } else if (this.formGroup.status === 'VALID') {
      const user: User = {
        username: this.formGroup.value.username,
        phNumber: this.formGroup.value.phNumber,
        fullName: this.formGroup.value.fullName,
        dob: this.formGroup.value.dob,
        gender: this.formGroup.value.gender,
        workType: this.formGroup.value.workType,
        password: this.formGroup.value.password || this.loggenInUser?.password,
        policies: this.loggenInUser?.policies,
        role: 'user',
      };
      console.log(user);
      if (this.loggenInUser && this.imageUrl) {
        localStorage.setItem(this.loggenInUser?.username, this.imageUrl);
      }
      this.userService.updateUser(user);
      this.snackBar.open('User Updated Successfully', '', {
        duration: 3000,
      });
    }
  }
}
