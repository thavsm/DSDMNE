import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCategoryRoutes } from './form-category.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { AddEditCategoryComponent } from '../form-category/add-edit-category/add-edit-category.component';
import { GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import {PDFModule,ExcelModule,} from "@progress/kendo-angular-grid";

@NgModule({
  declarations: [
    FormCategoryComponent,
    AddEditCategoryComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    RouterModule.forChild(FormCategoryRoutes),
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
    GridModule,
    ButtonsModule,
    InputsModule,
    PDFModule,
    ExcelModule,
  ]
})
export class FormCategoryModule { }