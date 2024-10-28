import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch } from "@angular/common/http";
import { WeatherService } from './services/weather.service';
import { PokemonService } from './services/pokemon.service';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), WeatherService, PokemonService, importProvidersFrom(HttpClient), provideHttpClient(withFetch())]
};
