import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import { AuthActions } from './auth/auth-action-types';
import { isLoggedInSelector, isLoggedOutSelector } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {

    const profile = localStorage.getItem('user')

    profile && this.store.dispatch(AuthActions.login({ user: JSON.parse(profile) }))
    


    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOutSelector))

  }

  logout() {
    const newLogoutAction = AuthActions.logout()
    this.store.dispatch(newLogoutAction)
  }

}
