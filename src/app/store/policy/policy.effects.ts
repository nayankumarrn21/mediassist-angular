import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PoliciesService } from '../../services/policies.service';
import { catchError, exhaustMap, last, of } from 'rxjs';
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

  constructor(
    private actions$: Actions,
    private policyService: PoliciesService,
    private store: Store<Policy[]>
  ) {}
}
