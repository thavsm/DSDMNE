import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

import { WorkflowComponent } from './workflow.component';
import { DiagramComponent } from './diagram/diagram.component';
import { WorkflowRoutes } from './workflow.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(WorkflowRoutes),
        FormsModule
    ],
    
    declarations: [
        WorkflowComponent,
        DiagramComponent
    ]
})

export class WorkflowModule {}
