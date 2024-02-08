import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeactivateFormService {
  public isRegisterisDirty = false;
  public formComplete = false;
  constructor() {}

  setIsRegisterisDirty(isRegisterisDirty: boolean): void {
    this.isRegisterisDirty = isRegisterisDirty;
  }

  setFormComplete(formComplete: boolean): void {
    this.formComplete = formComplete;
  }
}
