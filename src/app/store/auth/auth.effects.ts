import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import * as AuthActions from './auth.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private http: HttpClient,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.userService.login(action.username, action.password).pipe(
          map((data) => {
            if (data && data.token) {
              return AuthActions.loginSuccess({
                user: { ...data.user, token: data.token },
              });
            }
            return AuthActions.loginFailure({ error: data.errorMessage });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
}
