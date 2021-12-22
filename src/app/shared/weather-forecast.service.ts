import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WeatherForecast } from './weather-forecast.model';

@Injectable({
  providedIn: 'root'
})

export class WeatherForecastService { 

    
  constructor(private http:HttpClient) { }

  
  wformData:WeatherForecast = new WeatherForecast();
  public wlist:WeatherForecast[];
  
  readonly wbaseURL = environment.API_URL + '/WeatherForecast';

  refreshwlist(){
    this.http.get(this.wbaseURL)
    .toPromise()
    .then(res=> this.wlist = res as WeatherForecast[]);

    console.log(this.wlist);
  }

  /* refreshwlist() {

    console.log(this.wlist.length);

    // this.http.get(this.wbaseURL)
    //   .subscribe(
    //     data => this.wlist = (data as any).results,
    //     err => {
    //       console.log(err);
    //     },
    //     () => console.log(this.wlist[1].summary));
  
  }*/
}