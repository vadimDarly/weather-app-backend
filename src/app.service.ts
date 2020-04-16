import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { WeatherInterface } from './weather.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {
  }

  public getWeather(lat: number, lng: number): Observable<WeatherInterface> {
    return this.httpService.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.WEATHER_TOKEN}&units=metric`,
    ).pipe(map(res => {
      return  {
        temp: res.data.main.temp,
        humidity: res.data.main.humidity,
        time: this.getCurrentTime(),
      };
    }));
  }

 private getCurrentTime(): string {
    return `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  }
}
