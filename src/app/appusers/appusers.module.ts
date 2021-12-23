import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './appusers.component';
import { AppusersRoutes } from './appusers.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AppusersRoutes),
        FormsModule
    ],
    declarations: [UsersComponent]
})

export class AppusersModule {}
