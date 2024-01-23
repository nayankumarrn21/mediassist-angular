import { Component } from '@angular/core';
import { PoliciesService } from '../../../services/policies.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PolicyAddDialogComponent } from '../../policy/policy-add-dialog/policy-add-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  policyList: Array<any> = [];

  constructor(
    private policiesService: PoliciesService,
    public dialog: MatDialog
  ) {
    this.policyList = this.policiesService.getAllPolicies();
  }

  addPolicy(): void {
    const dialogRef = this.dialog.open(PolicyAddDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
