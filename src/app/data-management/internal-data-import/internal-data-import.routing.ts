import { Routes } from '@angular/router';

import { InternalDataImportComponent } from '../internal-data-import/internal-data-import.component';

export const InternalDataImportRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: InternalDataImportComponent
    }]
}
];