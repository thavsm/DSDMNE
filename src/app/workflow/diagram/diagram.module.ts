import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

import { DiagramComponent } from './diagram.component';
import { DiagramRoutes } from './diagram.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DiagramRoutes),
        FormsModule
    ],
    declarations: [DiagramComponent]
})

export class DiagramModule {}
