import { CanDeactivateFn, Router } from '@angular/router';
import { DeactivateFormService } from '../services/deactivate-form.service';
import { inject } from '@angular/core';

export const registerFormAuthGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const deactiaverService = inject(DeactivateFormService);
  console.log();
  if (
    deactiaverService.isRegisterisDirty$.subscribe() &&
    !deactiaverService.formComplete$.subscribe()
  ) {
    return window.confirm(
      'You have unsaved changes. Do you really want to leave?'
    );
  }
  return inject(Router).navigate(['/login']);
};
