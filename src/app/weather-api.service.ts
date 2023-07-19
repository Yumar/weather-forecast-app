import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private baseUrl = 'https://api.weather.gov/gridpoints/';

  constructor(private http: HttpClient) {}

  getForecast(identifier: string): Observable<any> {
    const url = this.baseUrl + identifier + '/31,80/forecast';
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        const periods = data.properties.periods;
        return periods.map((period: { startTime: string | number | Date; temperature: any; }) => ({
          startTime: new Date(period.startTime),
          temperature: period.temperature
        }));
      })
    );
  }
}
