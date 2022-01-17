import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { UserProfileComponent } from './userprofile.component';


export const UserProfileRoutes: Routes = [
    {

      path: '',
      component: UserProfileComponent
},
{

  path: 'changepassword',
  component: ChangePasswordComponent
}
];
