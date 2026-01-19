import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavoritesService } from '../core/services/favorites.service';
import { FavoriteCharacter } from '../core/models/character.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteCharacter[] = []
  displayModal: boolean = false;
  favoriteForm: FormGroup;
  selectedFavorite: FavoriteCharacter | null = null;

  constructor(
    private favoritesService: FavoritesService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.favoriteForm = this.fb.group({
      name: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.loadingFavorites()
  }

  loadingFavorites(): void {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites
    })
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este personaje de tus favoritos?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.favoritesService.deleteFavorite(id);
        this.messageService.add({
          severity: 'warn',
          summary: 'Eliminado',
          detail: 'Se quitó de favoritos'
        })
      }
    })
  }

  openEdit(favorite: FavoriteCharacter): void {
    this.selectedFavorite = favorite;
    this.displayModal = true;
    this.favoriteForm.patchValue({
      name: favorite.name,
      comment: favorite.comment
    });
  }

  saveFavorite() {
    if(this.favoriteForm.valid && this.selectedFavorite) {
      const updated: FavoriteCharacter = {
        ...this.selectedFavorite,
        ...this.favoriteForm.value
      };
      this.favoritesService.updateFavorite(updated)
      this.displayModal = false;
      this.messageService.add({
        severity: 'info',
        summary: 'Actualizado',
        detail: 'Favorito editado correctamente'
      })
    }
  }
}
