import { Component } from '@angular/core';
import { CurrentLocationWeatherComponent } from "../current-location-weather/current-location-weather.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GeoLocationServiceService } from '../shared/services/geo-location-service.service';
import { Subscription } from 'rxjs';
import { WeatherDataService } from '../shared/services/weather-data.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CurrentLocationWeatherComponent, HttpClientModule, FormsModule]
})
export class DashboardComponent {

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