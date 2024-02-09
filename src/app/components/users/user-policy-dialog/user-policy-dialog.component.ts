import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Policy } from '../../../interfaces/policy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Store } from '@ngrx/store';
import { User } from '../../../interfaces/user';
import { loggedInUser } from '../../../store/auth/auth.selector';
import { UserPolicy } from '../../../interfaces/user-policy';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-policy-dialog',
  templateUrl: './user-policy-dialog.component.html',
  styleUrl: './user-policy-dialog.component.css',
})
export class UserPolicyDialogComponent {
  formGroup: any;
  multiSelectControl = new FormControl([]);
  loggedInUser: User | null = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public policy: Policy,
    private userService: UsersService,
    private store: Store<User>,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserPolicyDialogComponent>
  ) {
    console.log(policy.beneficiariesList);
    this.formGroup = new FormGroup({
      startedDate: new FormControl('', Validators.required),
      endingDate: new FormControl('', Validators.required),
      beneficiaries: this.multiSelectControl,
      nominee: new FormControl('', Validators.required),
    });
    this.store.select(loggedInUser).subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  addUserPolicy() {
    if (this.loggedInUser && this.formGroup.status === 'VALID') {
      const userPolicy: UserPolicy = {
        id: this.policy.id,
        nominee: this.formGroup.value.nominee,
        beneficiaries: this.multiSelectControl.value || [],
        startedDate: this.formGroup.value.startedDate,
        endingDate: this.formGroup.value.endingDate,
      };
      if (userPolicy.startedDate > userPolicy.endingDate) {
        this.snackBar.open(
          'Start Date Cannot be greater then ending Date',
          '',
          {
            duration: 3000,
          }
        );
        return;
      }

      let response = this.userService.updateUserPolicy(
        userPolicy,
        this.loggedInUser
      );
      this.snackBar.open(response, '', {
        duration: 3000,
      });
      this.dialogRef.close();
    }
  }
}
