import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlreportsComponent } from './sqlreports/sqlreports.component';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routing';

import { MaterialModule } from '../app.module';
import { ReportsviewerComponent } from './reportsviewer/reportsviewer.component';
//import { ReportViewerModule } from 'ngx-ssrs-reportviewer';
import { IframereportsviewerComponent } from './iframereportsviewer/iframereportsviewer.component';






@NgModule({
  declarations: [
    SqlreportsComponent,
    ReportsviewerComponent,
    IframereportsviewerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportsRoutes),
    
    MaterialModule
  //  ReportViewerModule
  ]
})
export class ReportsModule { }
