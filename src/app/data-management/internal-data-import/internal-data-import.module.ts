import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InternalDataImportRoutes } from './internal-data-import.routing';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { InternalDataImportComponent } from './internal-data-import.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import {  MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ViewInternalDataImportComponent } from './view-internal-data-import/view-internal-data-import.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { AngularDualListBoxModule } from 'angular-dual-listbox';


@NgModule({
  declarations: [InternalDataImportComponent,ViewInternalDataImportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(InternalDataImportRoutes),
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    AngularDualListBoxModule,
    MatInputModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    NgbModule,
    MatSelectModule,
    MatExpansionModule,
    ReactiveFormsModule,
    ButtonsModule,
    GridModule,
    InputsModule,
    PDFExportModule
  ]
})
export class InternalDataImportModule { }
