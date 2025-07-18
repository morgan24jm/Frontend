import { Routes } from '@angular/router';
import { TaskListComponent } from '../tasks/task-list/task-list.component';
import { TaskCreateComponent } from '../tasks/task-create/task-create.component';

export const TASK_ROUTES: Routes = [
  { path: 'task-list', component: TaskListComponent },
 { path: 'task-create', component: TaskCreateComponent }
];
