import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDesignerComponent } from '../form-design/form-designer.component';
import { FormDesignRoutes } from './form-design.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    FormDesignerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormDesignRoutes),
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    DragDropModule,
    MatTabsModule,
    MatDividerModule

  ]
})
export class FormDesignModule { }
