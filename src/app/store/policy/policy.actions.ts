import { createAction, props } from '@ngrx/store';
import { Policy } from '../../interfaces/policy';

export const addPolicy = createAction(
  '[Policy] add',
  props<{ policy: Policy }>()
);

export const deletePolicy = createAction(
  '[Policy] delete',
  props<{ id: String }>()
);
