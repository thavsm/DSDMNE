import { Routes } from '@angular/router';

import { FormInboxComponent } from '../form-inbox/form-inbox.component';

export const FormInboxRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: FormInboxComponent
    }]
}
];