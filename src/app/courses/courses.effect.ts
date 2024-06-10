import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesActions } from './courses-action-types';
import { concatMap, map } from 'rxjs/operators';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CoursesEffect {
  constructor(private actions$: Actions, private coursesService: CoursesHttpService) { }
  loadCourses$ = createEffect(() => this.actions$.pipe(ofType(CoursesActions.getCoursesAction), concatMap(() => this.coursesService.findAllCourses()), map(courses => CoursesActions.coursesLoadedAction({ courses }))))
  updateCourse$ = createEffect(() => this.actions$.pipe(ofType(CoursesActions.courseUpdated), concatMap(courseUpdate => this.coursesService.saveCourse(courseUpdate.update.id, courseUpdate.update.changes))), { dispatch: false })
}
