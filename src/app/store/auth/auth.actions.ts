import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user';

export const login = createAction(
  '[Auth] login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] login_success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] login_failure',
  props<{ error: String }>()
);

export const updatLoggedInUser = createAction(
  '[Auth] updat_logged_user',
  props<{ user: User }>()
);

export const logout = createAction('[Auth] logout');
