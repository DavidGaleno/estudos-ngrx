import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { compareCourses, Course } from '../model/course';
import { CoursesActions } from '../courses-action-types';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const coursesFeatureKey = 'courses';



export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean

}
export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
})

export const initialCoursesState = adapter.getInitialState({ allCoursesLoaded: false })


export const coursesReducer = createReducer(initialCoursesState, on(CoursesActions.coursesLoadedAction, (state, action) =>
  adapter.addMany(action.courses, { ...state, allCoursesLoaded: true })
), on(CoursesActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state)))

export const coursesSelectors = adapter.getSelectors()


