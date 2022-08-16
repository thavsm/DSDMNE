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
import { GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { PDFModule, ExcelModule, } from "@progress/kendo-angular-grid";
import { NgxSpinnerModule } from 'ngx-spinner';
import { NewroleComponent } from './newrole/newrole.component';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import { FacilitymanagerComponent } from './facilitymanager/facilitymanager.component';
import { FacilityUpdateComponent } from './facilitymanager/facility-update/facility-update.component';
import { FacilityaddComponent } from './facilitymanager/facilityadd/facilityadd.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserManagerRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        GridModule,
        ButtonsModule,
        InputsModule,
        PDFModule,
        ExcelModule,
        NgxSpinnerModule,
        AngularDualListBoxModule,
        MatStepperModule,
        MatListModule
    ],

    declarations: [
        RoleComponent,
        AppusersComponent,
        FormrolesComponent,
        AddformrolesComponent,
        MenurolesComponent,
        RoleaccessComponent,
        NewroleComponent,
        FacilitymanagerComponent,
        FacilityUpdateComponent,
        FacilityaddComponent
    ]
})

export class UserManagerModule { }
