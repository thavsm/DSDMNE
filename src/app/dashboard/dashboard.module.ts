import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { TaskDetailComponent } from './taskdetail/taskdetail.component';
import { UserProfileComponent } from '../userprofile/userprofile.component';
import { ChangePasswordComponent } from '../userprofile/changepassword/changepassword.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        DashboardComponent,
        TaskDetailComponent,
        UserProfileComponent,
        ChangePasswordComponent
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
        ]
})

export class DashboardModule {}
