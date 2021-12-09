import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { LoginComponent } from './pages/login/login.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
          canActivate:[AuthGuard]
      },
         {
        path: 'weather',
        loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule)
        //component: WeatherComponent
    },
    {
      path: 'formList',
      loadChildren: () => import('./form-list/form-list.module').then(m => m.FormListModule)
      //component: formList Component 
  },
  {
    path: 'formDesign',
    loadChildren: () => import('./form-design/form-design.module').then(m => m.FormDesignModule)
    //component: formList Component 
},
{
  path: 'process',
  loadChildren: () => import('./process/process.module').then(m => m.ProcessModule)
},
{
  path: 'workflow',
  loadChildren: () => import('./workflow/workflow.module').then(m => m.WorkflowModule)
},
{
  path: 'userprofile',
  loadChildren: () => import('./userprofile/userprofile.module').then(m => m.UserProfileModule)
}
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },    {
        path: 'login',
        component: LoginComponent
    }
    ]
    }
];
