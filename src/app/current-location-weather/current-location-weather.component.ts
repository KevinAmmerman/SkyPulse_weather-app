import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-current-location-weather',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './current-location-weather.component.html',
  styleUrl: './current-location-weather.component.scss'
})
export class CurrentLocationWeatherComponent {

  weather = {
    "latitude": 48.16,
    "longitude": 11.63,
    "timezone": "Europe/Berlin",
    "offset": 1,
    "elevation": 516,
    "currently": {
      "time": 1708721280,
      "summary": "Cloudy",
      "icon": "cloudy",
      "nearestStormDistance": 0,
      "nearestStormBearing": 0,
      "precipIntensity": 0,
      "precipProbability": 0,
      "precipIntensityError": 0,
      "precipType": "none",
      "temperature": 2.28,
      "apparentTemperature": 0.42,
      "dewPoint": -0.13,
      "humidity": 0.84,
      "pressure": 937.59,
      "windSpeed": 6.48,
      "windGust": 11.26,
      "windBearing": 158,
      "cloudCover": 1,
      "uvIndex": 0,
      "visibility": 16.09,
      "ozone": 411.82
    }}

}
