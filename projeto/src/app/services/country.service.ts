import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiCountryUrl = 'https://flagsapi.com';

  constructor(private http: HttpClient) {}

  getCountry(country: string): Observable<any> {
    const url = `${this.apiCountryUrl}/${country}/shiny/32.png`;
    return this.http.get(url, { responseType: 'blob' }); // Retorna a imagem como blob
  }

  getPokemonData(url: string): Observable<any> {
    return this.http.get(url);
  }
}
