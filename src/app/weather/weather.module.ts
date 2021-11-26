import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WeatherComponent } from './weather.component';
import { WeatherRoutes } from './weather.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(WeatherRoutes),
        FormsModule
    ],
    declarations: [WeatherComponent]
})

export class WeatherModule {}
