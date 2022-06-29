import { IframereportsviewerComponent } from './iframereportsviewer/iframereportsviewer.component';
import { Routes } from '@angular/router';
import { ReportsviewerComponent } from './reportsviewer/reportsviewer.component';
import { SqlreportsComponent } from './sqlreports/sqlreports.component'

export const ReportsRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'sqlreports',
            component: SqlreportsComponent
        },
        {
            path: 'iframereportsviewer/:id',
            component: IframereportsviewerComponent
        }
    ]
    }

];
