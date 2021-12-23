import { Routes } from '@angular/router';

import { FormCaptureComponent } from '../form-capture/form-capture.component';

export const FormCaptureRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: FormCaptureComponent
    }]
}
];