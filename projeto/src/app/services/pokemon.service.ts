import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private baseUrl = 'https://pokeapi.co/api/v2/type';

    constructor(private http: HttpClient) { }

    getPokemonByType(type: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${type}`);
    }

    getPokemonData(url: string): Observable<any> {
        return this.http.get(url);
    }

}
