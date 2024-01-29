import { CanDeactivateFn } from '@angular/router';
import { DeactivateFormService } from '../services/deactivate-form.service';

export const registerFormAuthGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const deactiaverService = new DeactivateFormService();
  console.log(deactiaverService.isRegisterisDirty.subscribe());
  if (deactiaverService.isRegisterisDirty.subscribe()) {
    return window.confirm(
      'You have unsaved changes. Do you really want to leave?'
    );
  }
  return false;
};
