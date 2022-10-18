import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { hierarchymanagementRoutes } from './hierarchy-management.routing';
import { HierarchyManagementComponent } from './hierarchy-management.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TreeAddComponent } from './tree-add/tree-add.component';
import { IndicatorManagementComponent } from './indicator-management/indicator-management.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { NodeAddComponent } from './node-add/node-add.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { LevelAddComponent } from './level-add/level-add.component';
import { LevelNodeEditComponent } from './level-node-edit/level-node-edit.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { TargetAddComponent } from './target-add/target-add.component';
import { ExternaldataAddComponent } from './externaldata-add/externaldata-add.component'
import {MatRadioModule} from '@angular/material/radio';
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { InputsModule } from "@progress/kendo-angular-inputs";
import {PDFModule,ExcelModule,GridModule} from "@progress/kendo-angular-grid";
import { Injectable } from '@angular/core';
import { IndicatorAddComponent } from './indicator-management/indicator-add/indicator-add.component';
import { IndicatorEditComponent } from './indicator-management/indicator-edit/indicator-edit.component';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { LabelModule } from "@progress/kendo-angular-label";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectFilterModule } from 'mat-select-filter';
import { HierarchyFormPreviewComponent } from './hierarchy-form-preview/hierarchy-form-preview.component';
import {MatDividerModule} from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignaturePadModule } from 'angular2-signaturepad';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';

@Injectable({ providedIn: 'root' })



@NgModule({
  
  imports: [
    SignaturePadModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatCheckboxModule,
    DragDropModule,
    MatDividerModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSelectFilterModule,
    PDFExportModule,
    RouterModule.forChild(hierarchymanagementRoutes),
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    }),
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
    DropDownsModule,
    LabelModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatButtonModule],
    declarations: [HierarchyManagementComponent,  
      TreeAddComponent,
      NodeAddComponent,
      LevelAddComponent,
      LevelNodeEditComponent,
      TargetAddComponent,
      ExternaldataAddComponent,
      IndicatorManagementComponent,
      IndicatorAddComponent,
      IndicatorEditComponent,
      HierarchyFormPreviewComponent,
      GoogleMapsComponent
      ]
,
bootstrap: [HierarchyManagementComponent],
providers: [DatePipe]
})
export class HierarchyManagementModule { }
