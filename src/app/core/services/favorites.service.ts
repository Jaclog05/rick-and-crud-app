import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FavoriteCharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'rm_characters';

  private favoriteSubject = new BehaviorSubject<FavoriteCharacter[]>(this.loadFromLocalStorage());

  favorites$: Observable<FavoriteCharacter[]> = this.favoriteSubject.asObservable()

  constructor() { }

  get currentFavorites(): FavoriteCharacter[] {
    return this.favoriteSubject.value;
  }

  addFavorite(newFavorite: FavoriteCharacter): void {
    const current = this.currentFavorites

    if(!current.find(character => character.id === newFavorite.id)) {
      const updated = [...current, newFavorite]
      this.updateState(updated)
    }
  }

  deleteFavorite(favoriteId: number): void {
    const current = this.currentFavorites
    const updated = current.filter(character => character.id !== favoriteId)
    this.updateState(updated)
  }

  updateFavorite(updatedFavorite: FavoriteCharacter): void {
    const current = this.currentFavorites
    const updated = current.map(character => 
      character.id === updatedFavorite.id ? updatedFavorite : character
    )
    this.updateState(updated)
  }

  private updateState(updatedFavorites: FavoriteCharacter[]): void {
    this.favoriteSubject.next(updatedFavorites)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFavorites))
  }

  private loadFromLocalStorage(): FavoriteCharacter[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
