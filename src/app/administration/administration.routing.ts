import { Routes } from '@angular/router';
import { SchedulerComponent } from './scheduler/scheduler.component'
import { HolidayComponent } from './holiday/holiday.component'

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
        }
    ]
    }

];
