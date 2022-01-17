import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FormPreviewComponent } from './form-preview.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { FormPreviewRoutes } from './form-preview.routing';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    FormPreviewComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    RouterModule.forChild(FormPreviewRoutes),
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
    MatExpansionModule,
    SignaturePadModule

  ], exports: [ MatFormFieldModule, MatInputModule ]
})
export class FormPreviewModule { }


