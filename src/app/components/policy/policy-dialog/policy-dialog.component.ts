import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Policy {
  id: string;
  title: string;
  insuredAmount: string;
  companyName: string;
  beneficiariesList: any[];
  description: string;
}
@Component({
  selector: 'app-policy-dialog',
  templateUrl: './policy-dialog.component.html',
  styleUrl: './policy-dialog.component.css',
})
export class PolicyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PolicyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Policy
  ) {}
}
