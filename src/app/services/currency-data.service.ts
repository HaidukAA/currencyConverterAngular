import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {

  constructor(private http: HttpClient) {}

  getCurrencyData(country: string) {
    let url = 'https://api.exchangerate.host/latest?base=' + country;
    return this.http.get(url);
  }
}
