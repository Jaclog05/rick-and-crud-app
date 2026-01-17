import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiResponse, Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1): Observable<ApiResponse<Character>> {
    return this.http.get<ApiResponse<Character>>(`${this.apiUrl}/?page=${page}`)
      .pipe(
        catchError(error => {
          console.error('Error en la petición:', error);
          return throwError(() => new Error('Error al cargar personajes'));
        })
      );
  }
}
