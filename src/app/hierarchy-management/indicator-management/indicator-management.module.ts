import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxSpinnerModule} from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import {MatRadioModule} from '@angular/material/radio';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import {PDFModule,ExcelModule,GridModule} from "@progress/kendo-angular-grid";
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    PDFExportModule,
    FormsModule,  ReactiveFormsModule,  MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatPaginatorModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class IndicatorManagementModule { }
