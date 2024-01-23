import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserPolicy } from '../../../interfaces/user-policy';
import { MatTableDataSource } from '@angular/material/table';
import { PolicyDialogComponent } from '../../policy/policy-dialog/policy-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PoliciesService } from '../../../services/policies.service';

@Component({
  selector: 'app-user-policies',
  templateUrl: './user-policies.component.html',
  styleUrl: './user-policies.component.css',
})
export class UserPoliciesComponent {
  @Input()
  user!: User;

  dataSource = new MatTableDataSource<UserPolicy>([]);

  userPolicyList: UserPolicy[] = [];
  displayedColumns: string[] = [
    'id',
    'startedDate',
    'endingDate',
    'beneficiaries',
    'nominee',
    'options',
  ];
  ngOnInit() {
    this.dataSource.data = this.user.policies || [];
  }
  constructor(
    public dialog: MatDialog,
    public policyService: PoliciesService
  ) {}

  openPolicyDialog(id: string): void {
    console.log('open policy dialog', id);
    const dialogRef = this.dialog.open(PolicyDialogComponent, {
      data: this.policyService.getPolicyData(id),
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
