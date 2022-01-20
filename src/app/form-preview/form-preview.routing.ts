import { Routes } from '@angular/router';

import { FormPreviewComponent } from '../form-preview/form-preview.component';

export const FormPreviewRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: FormPreviewComponent
    }]
}
];