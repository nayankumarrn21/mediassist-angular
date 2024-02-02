import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authSelector = createFeatureSelector<AuthState>('auth');

export const loggedInUser = createSelector(authSelector, (state) => state.user);

export const authError = createSelector(authSelector, (state) => state.error);
