import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlreportsComponent } from './sqlreports/sqlreports.component';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routing';


@NgModule({
  declarations: [
    SqlreportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportsRoutes),
  ]
})
export class ReportsModule { }
