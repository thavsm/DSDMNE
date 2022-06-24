import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndicatorapprovalRoutes } from './indicatorapproval.routing';
import { IndicatorapprovalComponent } from './indicatorapproval.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { MatMenuModule } from '@angular/material/menu';
import { FacilitydataComponent } from './facilitydata/facilitydata.component';

@NgModule({
  declarations: [
    IndicatorapprovalComponent,
    FacilitydataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(IndicatorapprovalRoutes),    
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    LabelModule,
    DropDownsModule,
    SignaturePadModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,    
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
    ExcelModule,
    MatMenuModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
    ],
    exports: [
      IndicatorapprovalComponent 
      ]
})
export class IndicatorapprovalModule { }
