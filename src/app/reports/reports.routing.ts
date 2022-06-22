import { Routes } from '@angular/router';
import { SqlreportsComponent } from './sqlreports/sqlreports.component'

export const ReportsRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'sqlreports',
            component: SqlreportsComponent
        }
    ]
    }

];
