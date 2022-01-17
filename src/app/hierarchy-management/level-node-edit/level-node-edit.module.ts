import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { LevelNodeEditComponent } from './level-node-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [LevelNodeEditComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule,
    DatePipe,
    MatPaginatorModule,
    MatSelectModule,
    MatExpansionModule
  ]
  ,
bootstrap: [LevelNodeEditComponent],
providers: [DatePipe]
})
export class LevelNodeEditModule { }
