import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCaptureComponent } from '../form-capture/form-capture.component';
import { FormCaptureRoutes } from './form-capture.routing';
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
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { AddFormComponent } from './add-form/add-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    FormCaptureComponent,
    AddFormComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    RouterModule.forChild(FormCaptureRoutes),
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatToolbarModule,
    DragDropModule,
    MatTabsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatExpansionModule

  ], exports: [ MatFormFieldModule, MatInputModule ]
})
export class FormCaptureModule { }


