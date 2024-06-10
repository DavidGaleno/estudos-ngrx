import { AppState } from './../reducers/index';
import { ResolveFn } from '@angular/router';
import { Course } from './model/course';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { CoursesActions } from './courses-action-types';
import { coursesLoadedSelector } from './courses.selectors';

export const CoursesResolver: ResolveFn<Course> = (): Observable<any> => {
  let loading = false;
  const store = inject(Store<AppState>);
  return store.pipe(select(coursesLoadedSelector), tap(coursesLoaded => {
    if (!loading && !coursesLoaded) {
      store.dispatch(CoursesActions.getCoursesAction())
    }
  }), filter(coursesLoaded => coursesLoaded), first(), finalize(() => loading = false))
}


