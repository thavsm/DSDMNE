import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInboxComponent } from '../form-inbox/form-inbox.component';
import { FormInboxRoutes } from './form-inbox.routing';
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
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddFormComponent } from '../form-capture/add-form/add-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    FormInboxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormInboxRoutes),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
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
export class FormInboxModule { }
