import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, coursesSelectors } from './reducers';

export const selectCoursesState = createFeatureSelector<CoursesState>("courses")

export const getCoursesSelector = createSelector(selectCoursesState, coursesSelectors.selectAll)

export const getBeginnersCoursesSelector = createSelector(getCoursesSelector, courses => courses.filter(course => course.category == 'BEGINNER'))
export const getAdvancedCoursesSelector = createSelector(getCoursesSelector, courses => courses.filter(course => course.category == 'ADVANCED'))
export const getPromoCoursesSelector = createSelector(getCoursesSelector, courses => courses.filter(course => course.promo).length)
export const coursesLoadedSelector = createSelector(selectCoursesState, state => state.allCoursesLoaded)
