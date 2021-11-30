import { Routes } from '@angular/router';

import { FormListComponent } from '../form-list/form-list.component';

export const FormListRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: FormListComponent
    }]
}
];