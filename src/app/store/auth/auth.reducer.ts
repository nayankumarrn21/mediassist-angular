import { createReducer, on } from '@ngrx/store';
import { User } from '../../interfaces/user';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  error: String | null;
}

export const intialAuthState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  intialAuthState,
  on(AuthActions.loginSuccess, (state, { user }) => {
    console.log('Reducer executed');
    console.log('Previous State:', state);
    console.log('New State:', { ...state, user: user, error: null });
    return {
      ...state,
      user: user,
      error: null,
    };
  }),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error: error,
  })),
  on(AuthActions.logout, (state) => ({ ...state, user: null, error: null }))
);
