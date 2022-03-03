import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { UserManagerRoutes } from './usermanager.routing';
import { RoleComponent } from './role/role.component';
import { AppusersComponent } from './appusers/appusers.component';
import { FormrolesComponent } from './formroles/formroles.component';
import { AddformrolesComponent } from './addformroles/addformroles.component';
import { HierarchyManagementComponent } from '../hierarchy-management/hierarchy-management.component';
import { MenurolesComponent } from './menuroles/menuroles.component';
import { RoleaccessComponent } from './roleaccess/roleaccess.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserManagerRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],

    declarations: [
        RoleComponent,
        AppusersComponent,
        FormrolesComponent,
        AddformrolesComponent,
        MenurolesComponent,
        RoleaccessComponent
    ]
})

export class UserManagerModule { }
