import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WeatherApiService } from './weather-api.service';

@Injectable({ providedIn: 'root' })
export class WeatherResolver implements Resolve<any[]> {
  constructor(private weatherService: WeatherApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    const identifier = route.paramMap.get('id')!;
    return this.weatherService.getForecast(identifier).pipe(
      catchError(() => {
        this.router.navigate(['/error']);
        return of([]);
      })
    );
  }
}
