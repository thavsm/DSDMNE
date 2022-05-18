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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {NgxSpinnerModule} from 'ngx-spinner';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list'


@NgModule({
  declarations: [
    FormDesignerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormDesignRoutes),
    FormsModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatInputModule ,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    DragDropModule,
    MatTabsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatTooltipModule

  ]
})
export class FormDesignModule { }
