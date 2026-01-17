import { Component, OnInit } from '@angular/core';
import { RickMortyService } from '../core/services/rick-morty.service';
import { Character } from '../core/models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  loading: boolean = false;

  constructor(private rickMortyService: RickMortyService) {  }

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
