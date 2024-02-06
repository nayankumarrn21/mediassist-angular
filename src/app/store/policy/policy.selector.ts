import {
  createFeatureSelector,
  createSelector,
  createSelectorFactory,
} from '@ngrx/store';
import { Policy } from '../../interfaces/policy';

export const policyState = createFeatureSelector<Policy[]>('policies');

export const policyListSelector = createSelector(
  policyState,
  (state: Policy[]) => state
);
