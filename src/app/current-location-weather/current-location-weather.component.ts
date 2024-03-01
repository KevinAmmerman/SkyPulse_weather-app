import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GeoLocationServiceService } from '../shared/services/geo-location-service.service';
import { WeatherDataService } from '../shared/services/weather-data.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Weather } from '../shared/models/weather';

@Component({
  selector: 'app-current-location-weather',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, FormsModule],
  templateUrl: './current-location-weather.component.html',
  styleUrl: './current-location-weather.component.scss'
})
export class CurrentLocationWeatherComponent {


  searchResults: any = [];
  weatherData: any = [];
  geoLocationSub = new Subscription();
  weatherDataSub = new Subscription();
  input: string = '';
  search;
  currentTemp: number = 0;
  currentLocation: string = 'Berlin, Germany';

  berlin = {lat: 52.520008, lon: 13.404954};


  constructor(private geoService: GeoLocationServiceService, private weatherDataService: WeatherDataService) {
    this.search = this.debounce(this.searchGeoLocation, 500);
  }


  ngOnInit() {
    this.getWeather(this.berlin.lat, this.berlin.lon, this.currentLocation);
  }


  ngOnDestroy(): void {
    this.weatherDataSub.unsubscribe();
    this.geoLocationSub.unsubscribe();
  }


  searchGeoLocation() {
    if (this.input !== '') {
      this.geoLocationSub = this.geoService.searchLocation(this.input).subscribe((data: any) => {
        this.searchResults = data.features
        console.log(this.searchResults)
      });

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


  getWeather(lat: number, lon: number, location: any) {
    this.resetVariables();
    this.currentLocation = location;
    this.weatherDataSub = this.weatherDataService.getWeatherData(lon, lat).subscribe((data: any) => {
      this.currentTemp =  Math.round(data.currently.temperature);
      data.daily.data.forEach((day: any) => {
        this.weatherData.push(new Weather(day));
      });
    })
    console.log(this.weatherData)
  }


  resetVariables() {
    this.currentTemp = 0;
    this.weatherData = [];
    this.searchResults = [];
    this.input = '';
  }

}
