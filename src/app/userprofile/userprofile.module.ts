import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileRoutes } from './userprofile.routing';
import { MaterialModule } from '../app.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
        
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
    ]

})

export class UserProfileModule {}
