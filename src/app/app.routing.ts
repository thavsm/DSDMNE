import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { LoginComponent } from './pages/login/login.component';
 
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'weather',
        loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule)
      },
      {
        path: 'formCategory',
        loadChildren: () => import('./form-category/form-category.module').then(m => m.FormCategoryModule)
      },
      {
        path: 'formList',
        loadChildren: () => import('./form-list/form-list.module').then(m => m.FormListModule)
      },
      {
        path: 'formDesign',
        loadChildren: () => import('./form-design/form-design.module').then(m => m.FormDesignModule)
      },
      {
        path: 'formCapture',
        loadChildren: () => import('./form-capture/form-capture.module').then(m => m.FormCaptureModule)
      },
      {
        path: 'formInbox',
        loadChildren: () => import('./form-inbox/form-inbox.module').then(m => m.FormInboxModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'pages',
      loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    }, {
      path: 'login',
      component: LoginComponent
    }
    ]
  }
];
