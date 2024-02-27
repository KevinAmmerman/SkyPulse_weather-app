import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationServiceService {

  constructor(private http: HttpClient) {
  }

  searchLocation(query: string) {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${query}&lang=de&limit=10&type=city&apiKey=1f0cbc28e50e4db19cb831745c5953a2`;
    return this.http.get(url);
  }
}
