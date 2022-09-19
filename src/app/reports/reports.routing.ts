import { IframereportsviewerComponent } from './iframereportsviewer/iframereportsviewer.component';
import { Routes } from '@angular/router';
import { ReportsviewerComponent } from './reportsviewer/reportsviewer.component';
import { SqlreportsComponent } from './sqlreports/sqlreports.component'
import { PowerBiViewerComponent } from './power-bi-viewer/power-bi-viewer.component';
import { IndicatorReportComponent } from './indicator-report/indicator-report.component';

export const ReportsRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'sqlreports',
            component: SqlreportsComponent
        },
        {
            path: 'powerBireports',
            component: PowerBiViewerComponent
        },
        {
            path: 'iframereportsviewer/:id',
            component: IframereportsviewerComponent
        },
        {
            path: 'indicatorReports',
            component: IndicatorReportComponent
        }
    ]
    }

];
