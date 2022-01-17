import { Routes } from '@angular/router';

import { HierarchyManagementComponent } from './hierarchy-management.component';

export const hierarchymanagementRoutes: Routes = [
    {

      path: '',
      children: [ {
      path: '',
      component: HierarchyManagementComponent
    }]
}
];
