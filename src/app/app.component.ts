import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'Weather Forecast';
  isLoading = false;

  redirectToWeather(identifier: string): void {
    this.isLoading = true;
    this.router.navigate(['/weather', identifier])
    .finally(() => this.isLoading = false);
  }
}
