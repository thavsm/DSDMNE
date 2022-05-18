import { Routes } from '@angular/router';

import { HierarchyManagementComponent } from './hierarchy-management.component';
import { IndicatorManagementComponent } from './indicator-management/indicator-management.component';

export const hierarchymanagementRoutes: Routes = [
    {

      path: '',
      children: [ {
      path: 'HierarchyManagement',
      component: HierarchyManagementComponent
    },
    {
      path: 'GeographyManagement',
      component: HierarchyManagementComponent
    },
    {
      path: 'LevelManagement',
      component: HierarchyManagementComponent
    }

    ,
    {
      path: 'location',
      component: HierarchyManagementComponent
    }

    ,
    {
      path: 'level',
      component: HierarchyManagementComponent
    }
  
  ,
    {
      path: 'indicator-management',
      component: IndicatorManagementComponent
    }
  
  ]
}
];

