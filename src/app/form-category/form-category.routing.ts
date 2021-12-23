import { Routes } from '@angular/router';

import { FormCategoryComponent } from '../form-category/form-category.component';

export const FormCategoryRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: FormCategoryComponent
    }]
}
];