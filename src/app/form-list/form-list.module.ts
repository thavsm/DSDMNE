import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormListComponent } from '../form-list/form-list.component';
import { FormListRoutes } from './form-list.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FormAddComponent } from './form-add/form-add.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import {PDFModule,ExcelModule,} from "@progress/kendo-angular-grid";

@NgModule({
  declarations: [
    FormListComponent,
    FormAddComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    PDFModule,
    ExcelModule,
    MatTooltipModule,
    RouterModule.forChild(FormListRoutes),
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class FormListModule { }