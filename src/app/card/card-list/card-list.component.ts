import { Component, HostListener, Inject } from '@angular/core';
import { CardItemComponent } from './card-item/card-item.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CharactersService } from 'src/app/services/characters.service';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CardItemComponent, SearchBarComponent],
})
export class CardListComponent {
  public characters$ = this.charactersService.characters$;

  constructor(private charactersService: CharactersService) {}
}
