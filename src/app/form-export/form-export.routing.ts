import { Routes } from '@angular/router';

import { FormExportComponent } from '../form-export/form-export.component';

export const FormExportRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: FormExportComponent
    }]
}
];