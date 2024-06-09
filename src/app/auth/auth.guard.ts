import { AppState } from './../reducers/index';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedInSelector } from './auth.selectors';
import { tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store<AppState>)
  const router: Router = inject(Router)
  return store.pipe(select(isLoggedInSelector), tap(loggedIn => !loggedIn && router.navigateByUrl('/login')))
}
