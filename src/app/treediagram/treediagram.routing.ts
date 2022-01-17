import { Routes } from '@angular/router';

import { TreediagramComponent } from './treediagram.component';

export const treeDiagramRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: TreediagramComponent
    }]
}
];
