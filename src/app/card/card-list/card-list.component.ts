import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/character.model';
import { CardItemComponent } from './card-item/card-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CardItemComponent],
})
export class CardListComponent {
  public readonly character$!: Observable<Character>;
}
