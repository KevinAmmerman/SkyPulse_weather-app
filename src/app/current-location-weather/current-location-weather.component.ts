import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GeoLocationServiceService } from '../shared/services/geo-location-service.service';
import { WeatherDataService } from '../shared/services/weather-data.service';
import { Observable, Subject, Subscription, catchError, debounceTime, fromEvent, of, reduce, switchMap, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Weather } from '../shared/models/weather';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ShareDataService } from '../shared/services/share-data.service';
import { GeoLocation } from '../shared/models/geo-location';

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
  currentTemp: number = 0;
  currentLocation: GeoLocation;
  private searchTerms = new Subject<string>();


  constructor(
    private geoService: GeoLocationServiceService, 
    private weatherDataService: WeatherDataService, 
    private localStorage: LocalStorageService,
    private shareData: ShareDataService
    ) {
    this.currentLocation = this.shareData.getData()
  }


  ngOnInit() {
    this.getWeather(this.currentLocation.lat, this.currentLocation.lon);
    this.geoLocationSub = this.searchTerms.pipe(
      debounceTime(1000),
      switchMap(term => term ? this.geoService.searchLocation(term) : of([])),
      catchError((error: Error) => {
        console.log(new Error('HTTP Request failed!'));
        return of([]);
      })
    ).subscribe((data: any) => {
      this.searchResults = data ? data.features : [];
    })
  }


  ngOnDestroy(): void {
    this.weatherDataSub.unsubscribe();
    this.geoLocationSub.unsubscribe();
  }

  searchGeoLocation() {
    this.searchTerms.next(this.input)
  }


  getWeatherOfLocation(geo: any) {
    this.currentLocation = new GeoLocation(geo.properties);
    this.getWeather(this.currentLocation.lat, this.currentLocation.lon)
  }


  getWeather(lat: number, lon: number) {
    this.resetVariables();
    this.weatherDataSub = this.weatherDataService.getWeatherData(lon, lat).pipe(
      catchError((err: Error) => {
        console.log(new Error('HTTP Request failed!'));
        return of([]);
      })
    ).subscribe((data: any) => {
      this.currentTemp =  Math.round(data.currently.temperature);
      data.daily.data.forEach((day: any) => {
        this.weatherData.push(new Weather(day));
      });
      this.updateLocalStorage(lat, lon)
    })
  }


  resetVariables() {
    this.currentTemp = 0;
    this.weatherData = [];
    this.searchResults = [];
    this.input = '';
  }


  updateLocalStorage(lat: number, lon: number) {
    const searchedWeather = { weather: this.weatherData, city: this.currentLocation.city, country: this.currentLocation.country, lat, lon, date: new Date()};
    let weatherLocalStorage = this.localStorage.getDataFromLocalStorage() || [];
    const isExisting = weatherLocalStorage.some((e: any) => e.city === this.currentLocation.city);
    if (!isExisting) {
      const updatedWeatherLocalStorage = [...weatherLocalStorage, searchedWeather];
      try {
        this.localStorage.setDataToLocalStorage(updatedWeatherLocalStorage);
      } catch (error) {
        console.error('Failed to update local storage:', error);
      }
    } else {
      return;
    }
  }
}