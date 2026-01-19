import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] | undefined;
  favoritesCount: number = 0;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Personajes', icon: 'pi pi-fw pi-users', routerLink: '/characters' },
      { label: 'Favoritos', icon: 'pi pi-fw pi-star', routerLink: '/favorites' }
    ]

    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoritesCount = favorites.length
    })
  }
}
