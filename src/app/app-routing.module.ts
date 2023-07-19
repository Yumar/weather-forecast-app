import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';
import { ErrorComponent } from './error/error.component';
import { WeatherResolver } from './weather-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'weather/:id',
    component: WeatherComponent,
    resolve: { forecastData: WeatherResolver },
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
