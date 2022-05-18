import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { HolidayComponent } from './holiday/holiday.component';
import { RouterModule } from '@angular/router';
import { AdministrationRoutes } from './administration.routing';

@NgModule({
  declarations: [
    SchedulerComponent,
    HolidayComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdministrationRoutes),
  ]
})
export class AdministrationModule { }
