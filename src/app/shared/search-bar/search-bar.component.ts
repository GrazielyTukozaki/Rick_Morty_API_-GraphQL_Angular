import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  public searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });

  public search(): void {
    // Para implementar depois: enviar o valor da pesquisa para o service
    console.log(`Termo buscado: ` + this.searchForm.value.searchTerm);
  }
}
