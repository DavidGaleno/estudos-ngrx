import { createAction, props } from '@ngrx/store';
import { Course } from './model/course';
import { Update } from '@ngrx/entity';

export const getCoursesAction = createAction('[Course Resolver] Get Courses')
export const coursesLoadedAction = createAction('[Get Courses Effect] Courses Loaded', props<{ courses: Course[] }>())
export const courseUpdated = createAction('[Edit Course Dialog] Course Updated', props<{ update: Update<Course> }>())

