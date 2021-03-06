import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LandingComponent } from './pages/landing/landing.component';

import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/resetpassword/resetpassword.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'appusers',
        loadChildren: () => import('./appusers/appusers.module').then(m => m.AppusersModule)
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
      },
      {
        path: 'formCategory',
        loadChildren: () => import('./form-category/form-category.module').then(m => m.FormCategoryModule)
      },
      {
        path: 'formPreview',
        loadChildren: () => import('./form-preview/form-preview.module').then(m => m.FormPreviewModule)
      },
      {
        path: 'formCapture',
        loadChildren: () => import('./form-capture/form-capture.module').then(m => m.FormCaptureModule)
      },
      {
        path: 'formExport',
        loadChildren: () => import('./form-export/form-export.module').then(m => m.FormExportModule)
      },
      {
        path: 'formInbox',
        loadChildren: () => import('./form-inbox/form-inbox.module').then(m => m.FormInboxModule)
      },
      {
        path: 'indicator-report',
        loadChildren: () => import('./calc-report/calc-report.module').then(m => m.CalcReportModule)
      },
      {
        path: 'hierarchy-management',      
        loadChildren: () => import('./hierarchy-management/hierarchy-management.module').then(m => m.HierarchyManagementModule)      
      },
      {
        path: 'hierarchy-management/indicator-management',      
        loadChildren: () => import('./hierarchy-management/indicator-management/indicator-management.module').then(m => m.IndicatorManagementModule)      
      },
      {
        path: 'location',      
        loadChildren: () => import('./hierarchy-management/hierarchy-management.module').then(m => m.HierarchyManagementModule)      
      },
      {
        path: 'usermanager/indicatorrole',      
        loadChildren: () => import('./fieldrole/fieldrole.module').then(m => m.FieldRoleModule)      
      },
      {
        path: 'level',      
        loadChildren: () => import('./hierarchy-management/hierarchy-management.module').then(m => m.HierarchyManagementModule)      
      },
      {
        path: 'treediagram',  
        loadChildren: () => import('./treediagram/treediagram.module').then(m => m.TreediagramModule)  
    },
    {
        path: 'usermanager',
        loadChildren: () => import('./usermanager/usermanager.module').then(m => m.UserManagerModule)
    },{

      path: 'internalDI',
      loadChildren: () => import('./data-management/internal-data-import/internal-data-import.module').then(m => m.InternalDataImportModule)
    },
    {
      path: 'externalDI',
      loadChildren: () => import('./data-management/external-data-import/external-data-import.module').then(m => m.ExternalDataImportModule)
    },
    {
      path: 'administration',
      loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
  },
  {
    path: 'indicatorapproval',
    loadChildren: () => import('./indicatorapproval/indicatorapproval.module').then(m => m.IndicatorapprovalModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
}
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'pages',
      loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    {
      path: 'home',
      component: LandingComponent
    },
    {
      path: 'login',
      component: LoginComponent
    }, {
      path: 'resetpassword',
      component: ResetPasswordComponent
    }]
  }
];