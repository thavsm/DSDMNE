import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../app.module';


import { ProcessComponent } from './process.component';
import { ProcessRoutes } from './process.routing';

@NgModule({
    imports: [
    CommonModule,
    RouterModule.forChild(ProcessRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
    ],
    declarations: [
        ProcessComponent
    ]
})

export class ProcessModule {}
