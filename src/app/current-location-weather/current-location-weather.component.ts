import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GeoLocationServiceService } from '../shared/services/geo-location-service.service';
import { WeatherDataService } from '../shared/services/weather-data.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-current-location-weather',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, FormsModule],
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

    searchResults: any = [];
    weatherData: any = [];
    geoLocationSub = new Subscription();
    weatherDataSub = new Subscription();
    input: string = '';
    search;

    constructor(private geoService: GeoLocationServiceService, private weatherDataService: WeatherDataService) {
        this.search = this.debounce(this.searchGeoLocation, 500);
    }

    searchGeoLocation() {
        if (this.input !== '') {
            this.geoLocationSub = this.geoService.searchLocation(this.input).subscribe((data: any) => this.searchResults = data.features);
        } else {
            this.searchResults = [];
            this.geoLocationSub.unsubscribe();
        }

    }

    debounce(func: Function, delay: number) {
        let timeoutId: any;
        return (...args: any) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    getWeather(obj: any) {
        const lat = obj.properties.lat;
        const lon = obj.properties.lon;
        this.weatherDataSub = this.weatherDataService.getWeatherData(lon, lat).subscribe((data: any) => this.weatherData = data )
    }

    ngOnDestroy(): void {
        this.weatherDataSub.unsubscribe();
        this.geoLocationSub.unsubscribe();
    }

}
