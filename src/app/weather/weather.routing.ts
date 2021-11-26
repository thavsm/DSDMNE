import { Routes } from '@angular/router';

import { WeatherComponent } from './weather.component';

export const WeatherRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: WeatherComponent
    }]
}
];
