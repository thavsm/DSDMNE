import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormListComponent,formAdd,formEdit } from '../form-list/form-list.component';
import { FormListRoutes } from './form-list.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    FormListComponent,
    formAdd,
    formEdit
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(FormListRoutes),
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class FormListModule { }