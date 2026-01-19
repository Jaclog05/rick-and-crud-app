import { Component, OnInit } from '@angular/core';
import { RickMortyService } from '../core/services/rick-morty.service';
import { FavoritesService } from '../core/services/favorites.service';
import { Character, FavoriteCharacter } from '../core/models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  loading: boolean = false;

  constructor(
    private rickMortyService: RickMortyService,
    private favoritesService: FavoritesService
  ) {  }

  agregarAFavoritos(char: Character): void{
    const newFavorite: FavoriteCharacter = {
      ...char,
      comment: "Añadido a Favoritos"
    }
    this.favoritesService.addFavorite(newFavorite)
  }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    this.rickMortyService.getCharacters().subscribe({
      next: (response) => {
        this.characters = response.results;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
