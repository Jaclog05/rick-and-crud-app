import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FavoriteCharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteSubject = new BehaviorSubject<FavoriteCharacter[]>([])

  favorites$: Observable<FavoriteCharacter[]> = this.favoriteSubject.asObservable()

  constructor() { }

  get currentFavorites(): FavoriteCharacter[] {
    return this.favoriteSubject.value;
  }

  addFavorite(newFavorite: FavoriteCharacter): void {
    const current = this.currentFavorites

    if(!current.find(character => character.id === newFavorite.id)) {
      const updated = [...current, newFavorite]
      this.favoriteSubject.next(updated)
    }
  }

  deleteFavorite(favoriteId: number): void {
    const current = this.currentFavorites
    const updated = current.filter(character => character.id !== favoriteId)
    this.favoriteSubject.next(updated)
  }
}
