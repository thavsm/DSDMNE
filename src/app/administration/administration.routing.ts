import { Routes } from '@angular/router';
import { SchedulerComponent } from './scheduler/scheduler.component'
import { HolidayComponent } from './holiday/holiday.component'
import { ReassignUserTasksComponent } from './reassign-user-tasks/reassign-user-tasks.component';
import{ReassignUserTasksAdComponent} from './reassign-user-tasks-ad/reassign-user-tasks-ad.component'

export const AdministrationRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'scheduler',
            component: SchedulerComponent
        },
        {
            path: 'holiday',
            component: HolidayComponent
        },
        {
            path: 'reassign-user-taskAd',
            component: ReassignUserTasksAdComponent
        },
        {
            path: 'reassign-task',
            component: ReassignUserTasksComponent
        }
    ]
    }

];
