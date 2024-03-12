import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationServiceService {

  constructor(private http: HttpClient) {
  }

  // API KEYS are just for test reasons used in the frontend and this is not best practice.
  searchLocation(query: string) {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${query}&lang=de&limit=10&type=city&apiKey=1f0cbc28e50e4db19cb831745c5953a2`;
    return this.http.get(url).pipe(
      retry(3),
      catchError(error => {
        console.error('An error has occurred', error);
        return of([]);
      })
    );
  }
}
