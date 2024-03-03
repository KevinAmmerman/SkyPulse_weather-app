import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setDataToLocalStorage(arr: any) {
    localStorage.setItem('searchedLocations', JSON.stringify(arr))
  }


  getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('searchedLocations')!);
  }
}