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
  weatherImage: string = '';
  cityFound: string = '';
  showWeather: boolean = false;
  country: string = '';
  description_weather: string = '';
  showError: boolean = false;
  errorMessage: string = '';

  constructor(
    private weatherService: WeatherService,
    private pokemonService: PokemonService
  ) { }


  searchWeatherAndPokemon() {
    this.weatherService.getWeather(this.city).subscribe(
      (weatherData) => {
        // Caso de sucesso: o código permanece o mesmo
        this.temperature = weatherData.main.temp !== null ? Math.trunc(weatherData.main.temp) : null;
        this.isRaining = weatherData.weather.some((w: any) => w.main === 'Rain');
        this.cityFound = weatherData.name;
        this.country = weatherData.sys.country;
        this.weatherImage = weatherData.weather[0].icon;
        this.description_weather = weatherData.weather[0].description;
  
        this.pokemonType = this.getPokemonType();
        this.getPokemon(this.pokemonType);
  
        // Mostra os cards com clima e Pokémon
        this.showWeather = true;

        // Aviso cidade não encontrada
        this.showError = false;

      },
      (error) => {
        // Tratamento do erro
        this.showWeather = false; // Esconde os cards em caso de erro

        if (error.error.cod === "404") {
          // Cidade não encontrada
          this.showError = true;
          this.errorMessage = 'Cidade não encontrada. Verifique o nome e tente novamente.';
        } else if (error.status === 400) {
          // Erro de requisição inválida
          this.showError = true;
          const missingParameters = error.error.parameters || [];
          this.errorMessage = `Erro na requisição. Parâmetros incorretos ou faltando: ${missingParameters.join(', ')}.`;
        } else if (error.status === 401) {
          // Erro de autenticação
          this.showError = true;
          this.errorMessage = 'Erro de autenticação. Verifique o token de acesso à API.';
        } else if (error.status === 429) {
          // Excesso de requisições
          this.showError = true;
          this.errorMessage = 'Excesso de requisições. Tente novamente mais tarde.';
        } else if (error.status >= 500 && error.status < 600) {
          // Erros internos do servidor
          this.showError = true;
          this.errorMessage = 'Erro inesperado no servidor. Tente novamente mais tarde.';
          console.error("Erro no servidor:", error);
        } else {
          console.error("Erro ao buscar dados do clima:", error);
        }
      }
    );
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
      this.pokemonImage = data.sprites.other.showdown.front_default || data.sprites.front_default;
    });
  }

}
