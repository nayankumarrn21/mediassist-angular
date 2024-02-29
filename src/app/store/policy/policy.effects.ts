import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PoliciesService } from '../../services/policies.service';
import { catchError, exhaustMap, last, map, of, switchMap } from 'rxjs';
import * as PolicyActions from '../policy/policy.actions';
import { Store } from '@ngrx/store';
import { Policy } from '../../interfaces/policy';
import { policyListSelector } from './policy.selector';

@Injectable()
export class PolicyEffects {
  //   removePolicy$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(PolicyActions.deletePolicy),
  //       exhaustMap(({ id }) => {
  //         return of(PolicyActions.deletePolicy({ id }));
  //       }),
  //       catchError((error) => of(error))
  //     )
  //   );

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.login),
  //     switchMap((action) =>
  //       this.userService.login(action.username, action.password).pipe(
  //         map((data) => {
  //           if (data && data.token) {
  //             return AuthActions.loginSuccess({
  //               user: { ...data.user, token: data.token },
  //             });
  //           }
  //           return AuthActions.loginFailure({ error: data.errorMessage });
  //         }),
  //         catchError((error) => of(AuthActions.loginFailure({ error })))
  //       )
  //     )
  //   )
  // );

  savePolicy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PolicyActions.getAllPolicies),
      switchMap(() =>
        this.policyService.getAllPoliciesFromDb().pipe(
          map((data) => {
            console.log('Policy Data are', data);
            return PolicyActions.savePolicy({ policies: data });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private policyService: PoliciesService,
    private store: Store<Policy[]>
  ) {}
}
