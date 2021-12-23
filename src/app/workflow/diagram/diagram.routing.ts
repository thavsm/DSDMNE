import { Routes } from '@angular/router';

import { DiagramComponent } from './diagram.component';

export const DiagramRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: DiagramComponent
    }]
}
];
