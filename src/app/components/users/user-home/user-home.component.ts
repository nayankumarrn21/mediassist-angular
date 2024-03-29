import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Policy } from '../../../interfaces/policy';
import { Store } from '@ngrx/store';
import { policyListSelector } from '../../../store/policy/policy.selector';
import { PolicyDialogComponent } from '../../policy/policy-dialog/policy-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../interfaces/user';
import { loggedInUser } from '../../../store/auth/auth.selector';
import { UserPolicy } from '../../../interfaces/user-policy';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { UserPolicyDialogComponent } from '../user-policy-dialog/user-policy-dialog.component';
import { UsersService } from '../../../services/users.service';
import * as PolicyAction from '../../../store/policy/policy.actions';
import { PoliciesService } from '../../../services/policies.service';

export interface TableDataSource {
  userPolicy: UserPolicy;
  policy: Policy;
}

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent {
  policyList: Policy[] = [];
  displayedColumns: string[] = [
    'id',
    'policyName',
    'startedDate',
    'endingDate',
    'beneficiaries',
    'nominee',
    'option',
  ];
  loggedInUser: User | null = null;
  userPolicyList: CdkTableDataSourceInput<TableDataSource> =
    new MatTableDataSource([]);

  constructor(
    store: Store<Policy | User>,
    public dialog: MatDialog,
    private userService: UsersService,
    private policyService: PoliciesService
  ) {
    store.select(loggedInUser).subscribe((user) => {
      this.loggedInUser = user;
      this.getUsersPolicyList();
    });
    store.dispatch(PolicyAction.getAllPolicies());

    store.select(policyListSelector).subscribe((policyList) => {
      this.policyList = policyList;
    });
  }

  getImage(policy: Policy) {
    return `assets/health${Math.floor(Number(policy.id) % 7)}.jpg`;
  }

  getPolicyName(id: string) {
    console.log('getPolicyName', id, this.policyList);
    return this.policyList.filter((data) => data.id == id)[0].title;
  }
  openPolicyDialog(policy: Policy): void {
    console.log('open policy dialog', policy);
    const dialogRef = this.dialog.open(PolicyDialogComponent, {
      data: policy,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openPolicyBuy(policy: Policy) {
    console.log(this.userPolicyList);
    const dialogRef = this.dialog.open(UserPolicyDialogComponent, {
      data: policy,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getUsersPolicyList();
      }
    });
  }

  getUsersPolicyList() {
    this.policyService
      .getUsersPoliciesFromDb(this.loggedInUser?.id)
      .subscribe((data) => {
        const policyList: TableDataSource[] = data;
        this.userPolicyList = new MatTableDataSource<TableDataSource>(
          policyList
        );
      });
  }
}
