import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { UserManagerRoutes } from './usermanager.routing';
import { RoleComponent } from './role/role.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserManagerRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],

    declarations: [
        RoleComponent
    ]
})

export class UserManagerModule { }
