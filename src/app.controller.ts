import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { WeatherInterface } from './weather.interface';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('getWeather')
  getWeather(@Query('lat') lat, @Query('lng') lng): Observable<WeatherInterface> {
    return this.appService.getWeather(lat, lng);
  }
}
