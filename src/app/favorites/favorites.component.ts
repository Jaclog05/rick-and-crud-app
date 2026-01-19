import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../core/services/favorites.service';
import { FavoriteCharacter } from '../core/models/character.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteCharacter[] = []

  constructor(
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadingFavorites()
  }

  loadingFavorites(): void {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites
    })
  }

  removeFavorite(favoriteId: number): void {
    this.favoritesService.deleteFavorite(favoriteId)
  }
}
