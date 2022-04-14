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
import { UserProfileComponent } from '../userprofile/userprofile.component';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })


@NgModule({
  
  imports: [
    NgxSpinnerModule,
    NgxPaginationModule,
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    PDFExportModule,
    RouterModule.forChild(hierarchymanagementRoutes),
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
    MatButtonModule],
    declarations: [HierarchyManagementComponent,  
      TreeAddComponent,
      NodeAddComponent,
      LevelAddComponent,
      LevelNodeEditComponent,
      TargetAddComponent,
      ExternaldataAddComponent]
,
bootstrap: [HierarchyManagementComponent],
providers: [DatePipe]
})
export class HierarchyManagementModule { }
