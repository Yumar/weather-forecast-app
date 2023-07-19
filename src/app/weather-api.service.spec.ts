import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherApiService } from './weather-api.service';

describe('WeatherApiService', () => {
  let service: WeatherApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherApiService]
    });
    service = TestBed.inject(WeatherApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch forecast data for a given identifier', () => {
    const identifier = 'LWX';
    const mockResponse = {
      properties: {
        periods: [
          { startTime: '2023-07-19T00:00:00-04:00', temperature: 30 },
          { startTime: '2023-07-19T03:00:00-04:00', temperature: 31 },
          { startTime: '2023-07-19T06:00:00-04:00', temperature: 32 },
        ]
      }
    };

    service.getForecast(identifier).subscribe(data => {
      expect(data).toBeDefined();
      expect(data.length).toBe(3);
    });
    const req = httpMock.expectOne(`https://api.weather.gov/gridpoints/${identifier}/31,80/forecast`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
