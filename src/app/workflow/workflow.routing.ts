import { Routes } from '@angular/router';

import { WorkflowComponent } from './workflow.component';

import { DiagramComponent } from './diagram/diagram.component';

export const WorkflowRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: WorkflowComponent
    },
    {
      path: 'diagram',
      component: DiagramComponent
  }]
}
];
