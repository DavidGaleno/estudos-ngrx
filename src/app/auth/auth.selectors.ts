import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

export const selectAuthenticationState = createFeatureSelector<AuthState>("auth")

export const isLoggedInSelector =
  createSelector(selectAuthenticationState, (auth) => !!auth.user);
export const isLoggedOutSelector =
  createSelector(isLoggedInSelector, isLoggedIn => !isLoggedIn);
