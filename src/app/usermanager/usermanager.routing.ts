import { Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { AppusersComponent } from './appusers/appusers.component';
import { FormrolesComponent } from './formroles/formroles.component';
import { HierarchyManagementComponent } from '../hierarchy-management/hierarchy-management.component';

export const UserManagerRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'role',
            component: RoleComponent
        }, {
            path: 'appusers',
            component: AppusersComponent
        }, {
            path: 'formroles',
            component: FormrolesComponent
        }
        
        , {
            path: 'location',
            component: HierarchyManagementComponent
        }, {
            path: 'level',
            component: HierarchyManagementComponent
        }
    
    ]
    }

];
