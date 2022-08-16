import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { IndicatorapprovalModule } from '../indicatorapproval/indicatorapproval.module';
import {PDFModule,ExcelModule,GridModule} from "@progress/kendo-angular-grid";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        IndicatorapprovalModule,
        PDFModule,
        ExcelModule,
        GridModule
    ],
    declarations: [
        DashboardComponent,
        TaskDetailComponent,
        UserProfileComponent,
        ChangePasswordComponent      
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
        ],
    schemas: [NO_ERRORS_SCHEMA]
        
})

export class DashboardModule {}
