import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import {PDFModule,ExcelModule,GridModule} from "@progress/kendo-angular-grid";
import { CalcReportComponent } from './calc-report.component';
import { CalcReportRoutes } from './calc-report.routing';
import { ApprovalFormComponent } from './approval-form/approval-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";

@NgModule({
  declarations: [
    CalcReportComponent,
    ApprovalFormComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    LabelModule,
    DropDownsModule,
    SignaturePadModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatPaginatorModule,
    RouterModule.forChild(CalcReportRoutes),
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
    MatTooltipModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    PDFModule,
    ExcelModule
  ]
})
export class CalcReportModule { }
