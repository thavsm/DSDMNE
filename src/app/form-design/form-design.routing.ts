import { Routes } from '@angular/router';

import { FormDesignerComponent } from '../form-design/form-designer.component';

export const FormDesignRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: FormDesignerComponent
    }]
}
];