import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import * as AuthActions from './auth.actions';
import { catchError, exhaustMap, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ username, password }) => {
        const user = this.userService.getUser(username);
        if (user && user.password === password) {
          console.log('Redux login success', username, password);
          return of(AuthActions.loginSuccess({ user: user }));
        } else {
          return of(
            AuthActions.loginFailure({ error: 'Invalid username or password' })
          );
        }
      }),
      catchError((error) =>
        of(AuthActions.loginFailure({ error: 'Error during login' }))
      )
    )
  );

  constructor(private actions$: Actions, private userService: UsersService) {}
}
