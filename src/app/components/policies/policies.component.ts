import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PoliciesService } from '../../services/policies.service';

import { PolicyDialogComponent } from '../policy-dialog/policy-dialog.component';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css',
})
export class PoliciesComponent {
  randomImage: string = '';

  constructor(
    private policiesService: PoliciesService,
    public dialog: MatDialog
  ) {}

  @Input()
  policy!: any;

  ngOnInit() {
    console.log(this.policy);
    this.randomImage = `assets/health${Math.floor(this.policy.id % 7)}.jpg`;
    console.log(this.randomImage);
  }

  openPolicyDialog(): void {
    const dialogRef = this.dialog.open(PolicyDialogComponent, {
      data: this.policy,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
