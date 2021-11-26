import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '../shared/weather-forecast.service'
import { WeatherForecast } from '../shared/weather-forecast.model';
import { __assign } from 'tslib';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: []
})
export class WeatherComponent implements OnInit {

  constructor(public service: WeatherForecastService) {    
   }


  ngOnInit(): void {
    console.log('before');
    this.service.refreshwlist();
    console.log('after');
  }

  
}
