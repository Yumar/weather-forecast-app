import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherApiService } from '../weather-api.service';
import { ActivatedRoute } from '@angular/router';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherApiService>;

  beforeEach(() => {
    weatherServiceSpy = jasmine.createSpyObj('WeatherApiService', ['getForecast']);

    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [HttpClientTestingModule, { provide: WeatherApiService, useValue: weatherServiceSpy }, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {params: {id: '24fkzrw3487943uf358lovd'}}
        }
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
