import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TaskDetailComponent } from './taskdetail/taskdetail.component';

export const DashboardRoutes: Routes = [
    {

      path: '',
      children: [ 
        {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
      path: 'taskdetail',
      component: TaskDetailComponent
    }
  ]
}
];
