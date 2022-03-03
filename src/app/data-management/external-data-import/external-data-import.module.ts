import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExternalDataImportRoutes } from './external-data-import.routing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExternalDataImportComponent } from './external-data-import.component';
import { AddEditExternalDataComponent } from './add-edit-external-data/add-edit-external-data.component';

import { MaterialModule } from 'src/app/app.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';


@NgModule({
  declarations: [AddEditExternalDataComponent,ExternalDataImportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ExternalDataImportRoutes),
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    PDFExportModule
  ]
})
export class ExternalDataImportModule { }
