import { Routes } from '@angular/router';
import { FieldroleComponent } from './fieldrole.component';

export const FieldRoleRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: FieldroleComponent
    }]
}
];