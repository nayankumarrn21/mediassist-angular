import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PoliciesService } from '../../../services/policies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Policy } from '../../../interfaces/policy';

@Component({
  selector: 'app-policy-add-dialog',
  templateUrl: './policy-add-dialog.component.html',
  styleUrl: './policy-add-dialog.component.css',
})
export class PolicyAddDialogComponent {
  multiSelectControl = new FormControl(this.policyObj.beneficiariesList || []);
  options = [
    { value: 'self', viewValue: 'Self' },
    { value: 'spouse', viewValue: 'Spouse' },
    { value: 'mother', viewValue: 'Mother' },
    { value: 'father', viewValue: 'Father' },
    { value: 'daughter', viewValue: 'Daughter' },
    { value: 'son', viewValue: 'Son' },
    { value: 'sister', viewValue: 'Sister' },
    { value: 'brother', viewValue: 'Brother' },
    { value: 'others', viewValue: 'Others' },
  ];

  formGroup: any;

  constructor(
    private policyService: PoliciesService,
    public dialogRef: MatDialogRef<PolicyAddDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public policyObj: Policy
  ) {
    this.formGroup = new FormGroup({
      title: new FormControl(this.policyObj.title, Validators.required),
      insuredAmount: new FormControl(
        this.policyObj.insuredAmount || '',
        Validators.required
      ),
      companyName: new FormControl(
        this.policyObj.companyName || '',
        Validators.required
      ),
      beneficiariesList: this.multiSelectControl,
      description: new FormControl(
        this.policyObj.description || '',
        Validators.required
      ),
    });
  }

  addPolicy(): void {
    console.log(this.multiSelectControl.value);

    let policy = {
      title: this.formGroup.value.title,
      companyName: this.formGroup.value.companyName,
      beneficiariesList: this.multiSelectControl.value,
      insuredAmount: this.formGroup.value.insuredAmount,
      description: this.formGroup.value.description,
    };
    console.log(policy, this.formGroup.status);
    if (this.formGroup.status === 'VALID') {
      this.policyService.createPolicy(policy);
      this.dialogRef.close();
      this.snackBar.open('Policy added successfully', '', {
        duration: 3000,
      });
    }
  }
}
