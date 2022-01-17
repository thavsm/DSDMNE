import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { TreediagramComponent } from './treediagram.component';
import { treeDiagramRoutes } from './treediagram.routing';
import { RouterModule } from '@angular/router';
import { TreediagramService } from '../treediagram.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from "@progress/kendo-angular-tooltip";
import { PDFExportModule } from '@progress/kendo-angular-pdf-export'

@NgModule({
  bootstrap: [TreediagramComponent],
  declarations: [TreediagramComponent], 
  imports: [
    CommonModule,
    RouterModule.forChild(treeDiagramRoutes),
    TreeViewModule,
    HttpClientModule, ButtonsModule,
    LabelModule,
    InputsModule,
    PDFExportModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgxPaginationModule,
    TooltipModule
  ],
  providers:[TreediagramService],
})
export class TreediagramModule { }
