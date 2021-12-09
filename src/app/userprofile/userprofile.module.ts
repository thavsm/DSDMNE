import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileRoutes } from './userprofile.routing';
import { MaterialModule } from '../app.module';

// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserProfileRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    
    declarations: [
    ]
})

export class UserProfileModule {}
