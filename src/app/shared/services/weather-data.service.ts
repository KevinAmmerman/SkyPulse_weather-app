import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http: HttpClient) { }

  getWeatherData(lon: number, lat: number) {
    const url = `https://api.pirateweather.net/forecast/sOgfd7Inh9o7rzJ3XBYr0MjZ9hA6vWbu/${lat}%2C${lon}?exclude=minutely%2C+hourly%2C+alerts&units=ca`
    return this.http.get(url);
  }
}
