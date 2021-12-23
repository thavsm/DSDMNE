import { Routes } from '@angular/router';

import { UsersComponent } from './appusers.component';

export const AppusersRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: UsersComponent
    }]
}
];
