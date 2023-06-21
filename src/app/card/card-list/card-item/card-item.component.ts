import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { MatCardModule } from '@angular/material/card';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class CardItemComponent {
  @Input() character!: Character;
}
