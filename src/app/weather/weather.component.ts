import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../weather-api.service';
import { Chart, TimeScale } from 'chart.js/auto';
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  identifier: string = "";
  forecastData!: any[];
  isLoading: boolean = true;
  isError: boolean = false;
  chart: any;

  constructor(private route: ActivatedRoute, private weatherService: WeatherApiService) {
  }

  ngOnInit(): void {
    Chart.register(TimeScale);
    this.route.params.subscribe((params) => {
      this.identifier = params['id'];
    });
    this.route.data.subscribe((data) => {
      if (data['forecastData']) {
        this.forecastData = data['forecastData'];
        this.renderChart();
        this.isLoading = false;
      } else {
        this.isError = true;
        this.isLoading = false;
      }
    });

  }

  getForecastData(): void {
    if (this.identifier) {
      this.weatherService.getForecast(this.identifier).subscribe(data => {
        this.forecastData = data;
        this.renderChart();
      });
    }
  }

  renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('weatherChart', {
      type: 'line',
      data: {
        labels: this.forecastData.map(item => item.startTime),
        datasets: [
          {
            label: 'Temperature',
            data: this.forecastData.map(item => item.temperature),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
          }
        ]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MM/dd/yyyy HH:mm'
            },
            adapters: {
              date: {
                locale: enUS,
              },
            },
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }
}
