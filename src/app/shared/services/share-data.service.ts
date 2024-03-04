import { Injectable } from '@angular/core';
import { GeoLocation } from '../models/geo-location';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  
  private data: any;

  constructor() {
    this.data = new GeoLocation({city: 'Berlin', country: 'Deutschland', lat: 52.520008, lon: 13.404954});
   }


  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
