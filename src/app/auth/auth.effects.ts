import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './auth-action-types';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(ofType(AuthActions.login), tap(action => {
    localStorage.setItem('user', JSON.stringify(action.user))
    this.router.navigateByUrl('/courses')

  })), { dispatch: false })
  logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(AuthActions.logout), tap(() => {
      localStorage.removeItem('user')
      this.router.navigateByUrl('/login')
    }))

  }, { dispatch: false })

  constructor(private actions$: Actions, private router: Router) {
  }
}
