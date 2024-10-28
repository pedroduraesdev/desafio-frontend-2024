import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {

  pokemonType: string = '';
  city: string = '';
  temperature: number | null = null;
  isRaining: boolean = false;
  pokemonName: string = '';
  pokemonImage: string = '';

  constructor(
    private weatherService: WeatherService,
    private pokemonService: PokemonService
  ) { }

  searchWeatherAndPokemon() {
    this.weatherService.getWeather(this.city).subscribe((weatherData) => {
      this.temperature = weatherData.main.temp;
      this.isRaining = weatherData.weather.some((w: any) => w.main === 'Rain');

      this.pokemonType = this.getPokemonType();
      this.getPokemon(this.pokemonType);
      
    });
  }

  getPokemonType(): string {
    if (this.isRaining) return 'electric';
    if (this.temperature !== null) {
      if (this.temperature < 5) return 'ice';
      if (this.temperature >= 5 && this.temperature < 10) return 'water';
      if (this.temperature >= 12 && this.temperature < 15) return 'grass';
      if (this.temperature >= 15 && this.temperature < 21) return 'ground';
      if (this.temperature >= 23 && this.temperature < 27) return 'bug';
      if (this.temperature >= 27 && this.temperature <= 33) return 'rock';
      if (this.temperature > 33) return 'fire';
    }
    return 'normal';
  }

  getPokemon(type: string) {
    this.pokemonService.getPokemonByType(type).subscribe((pokemonData) => {
      const pokemons = pokemonData.pokemon;
      const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)].pokemon;
      this.pokemonName = randomPokemon.name;

      // Busca os dados do Pokémon, incluindo a imagem
      this.fetchPokemonImage(randomPokemon.url);

    });
  }

  fetchPokemonImage(pokemonUrl: string) {
    this.pokemonService.getPokemonData(pokemonUrl).subscribe((data) => {
      this.pokemonImage = data.sprites.other.showdown.front_default;
    });
  }

}
