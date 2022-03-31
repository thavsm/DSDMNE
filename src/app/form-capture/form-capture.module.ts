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
import { AddSignatureComponent } from './add-form/add-signature.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { SignaturePadModule } from 'angular2-signaturepad';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import {PDFModule,ExcelModule,} from "@progress/kendo-angular-grid";
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    FormCaptureComponent,
    AddFormComponent,
    AddSignatureComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    GridModule,
    ButtonsModule,
    ExcelModule,
    PDFModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    RouterModule.forChild(FormCaptureRoutes),
    FormsModule,
    MatDialogModule,
    MatIconModule,
    SignaturePadModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatToolbarModule,
    DragDropModule,
    MatTabsModule,
    MatDividerModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    NgxSpinnerModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTooltipModule

  ], exports: [ MatFormFieldModule, MatInputModule ]
})
export class FormCaptureModule { }


