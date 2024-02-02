import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeactivateFormService {
  public isRegisterisDirty$ = new BehaviorSubject(false);
  public formComplete$ = new BehaviorSubject(false);
  constructor() {}

  setIsRegisterisDirty(isRegisterisDirty: boolean): void {
    this.isRegisterisDirty$.next(isRegisterisDirty);
  }

  setFormComplete(formComplete: boolean): void {
    this.formComplete$.next(formComplete);
  }
}
