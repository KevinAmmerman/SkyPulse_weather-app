import { Component } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { WeatherDataService } from '../shared/services/weather-data.service';
import { Weather } from '../shared/models/weather';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-saved-locations',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './saved-locations.component.html',
  styleUrl: './saved-locations.component.scss'
})
export class SavedLocationsComponent {

  savedWeather: Array<any> = [];
  weatherDataSub: Subscription = new Subscription();

  constructor(private localStorage: LocalStorageService, private weatherService: WeatherDataService) {

  }

  ngOnInit() {
    this.getSavedWeatherLocations();
    if (this.savedWeather.length > 0) this.compareTimestamps();
  }


  ngOnDestroy() {
    this.weatherDataSub.unsubscribe();
  }


  getSavedWeatherLocations() {
    this.savedWeather = this.localStorage.getDataFromLocalStorage();
    console.log(this.savedWeather)
  }


  compareTimestamps() {
    const currentTimestamp = new Date();
    const fourHoursInMilliseconds = 4 * 60 * 60 * 1000;
    this.savedWeather.forEach(async (w: any, index) => {
      const pastTimestamp = new Date(w.date)
      const diff = Math.abs(currentTimestamp.getTime() - pastTimestamp.getTime());
      if (diff > fourHoursInMilliseconds) {
        this.updateSavedWeather(index, w.lon, w.lat)
      }
    })
  }


  updateSavedWeather(index: number, lon: number, lat: number) {
    let weatherDataNew: Weather[] = [];
    this.weatherDataSub = this.weatherService.getWeatherData(lon, lat).subscribe((data: any) => {
      data.daily.data.forEach((data: any) => {
        weatherDataNew.push(new Weather(data));
      });
      this.savedWeather[index].weather = weatherDataNew;
      this.savedWeather[index].date = new Date();
    });
    this.localStorage.setDataToLocalStorage(this.savedWeather)
  }

}
