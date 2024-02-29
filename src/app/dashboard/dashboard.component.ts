import { Component } from '@angular/core';
import { CurrentLocationWeatherComponent } from "../current-location-weather/current-location-weather.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CurrentLocationWeatherComponent]
})
export class DashboardComponent {

    constructor() {}
}