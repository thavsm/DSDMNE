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


@NgModule({
  declarations: [
    FormInboxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormInboxRoutes),
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    DragDropModule,
    MatTabsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSelectModule,
    NgxSpinnerModule

  ]
})
export class FormInboxModule { }
