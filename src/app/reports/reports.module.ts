import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlreportsComponent } from './sqlreports/sqlreports.component';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routing';
import { MaterialModule } from '../app.module';
import { ReportsviewerComponent } from './reportsviewer/reportsviewer.component';
import { IframereportsviewerComponent } from './iframereportsviewer/iframereportsviewer.component';
import { PowerBiViewerComponent } from './power-bi-viewer/power-bi-viewer.component';
import { IndicatorReportComponent } from './indicator-report/indicator-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { PDFModule, ExcelModule, } from "@progress/kendo-angular-grid";

@NgModule({
  declarations: [
    SqlreportsComponent,
    ReportsviewerComponent,
    IframereportsviewerComponent,
    PowerBiViewerComponent,
    IndicatorReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportsRoutes),
    MaterialModule,
    CommonModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    MatTooltipModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatSelectModule
    //  ReportViewerModule
  ]
})
export class ReportsModule { }
