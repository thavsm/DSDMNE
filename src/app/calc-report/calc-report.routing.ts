import { Routes } from '@angular/router';

import { CalcReportComponent } from './calc-report.component';


export const CalcReportRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: CalcReportComponent
    }]
}
];
