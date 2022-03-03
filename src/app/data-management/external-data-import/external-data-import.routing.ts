import { Routes } from '@angular/router';

import { ExternalDataImportComponent } from '../external-data-import/external-data-import.component';

export const ExternalDataImportRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: ExternalDataImportComponent
    }]
}
];