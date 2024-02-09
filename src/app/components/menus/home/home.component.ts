import { Component } from '@angular/core';
import { PoliciesService } from '../../../services/policies.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PolicyAddDialogComponent } from '../../policy/policy-add-dialog/policy-add-dialog.component';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Policy } from '../../../interfaces/policy';
import { Store } from '@ngrx/store';
import { policyListSelector } from '../../../store/policy/policy.selector';
import * as PolicyAction from '../../../store/policy/policy.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  policyList: Array<any> = [];
  userList: Array<User> = [];

  constructor(
    private policiesService: PoliciesService,
    public dialog: MatDialog,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private store: Store<Policy[]>
  ) {
    // this.policyList = this.policiesService.getAllPolicies();
    this.store
      .select(policyListSelector)
      .subscribe((data) => (this.policyList = data));
    this.userList = this.userService.getUsers();
  }

  addPolicy(): void {
    const dialogRef = this.dialog.open(PolicyAddDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deletePolicyId(id: any): void {
    console.log(`Delete Policy`, id);
    const policyExists = this.userList.some((user) => {
      return user.policies && user.policies.some((policy) => policy.id == id);
    });
    if (policyExists) {
      this.snackBar.open(
        'The policy exists among users, and Im unable to delete it.',
        '',
        {
          duration: 3000,
        }
      );
    } else {
      this.store.dispatch(PolicyAction.deletePolicy({ id: id }));
      this.snackBar.open('Policy deleted successfully', '', {
        duration: 3000,
      });
    }
  }
}
