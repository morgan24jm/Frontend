import { Routes } from '@angular/router';
import { TaskListComponent } from '../tasks/task-list/task-list.component';

export const TASK_ROUTES: Routes = [
  { path: 'task-list', component: TaskListComponent }
];