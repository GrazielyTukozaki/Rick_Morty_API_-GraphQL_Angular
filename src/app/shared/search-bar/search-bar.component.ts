import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  Subject,
  map,
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  takeUntil,
} from 'rxjs';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnDestroy {
  search = new FormControl('');
  private destroy$ = new Subject<unknown>();

  constructor(private charactersService: CharactersService) {
    this.onSearch();
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onClear(): void {
    this.search.reset();
    this.charactersService.getDataAPI();
  }

  private onSearch(): void {
    this.search.valueChanges
      .pipe(
        map((search) => search?.toLowerCase().trim()),
        debounceTime(300),
        distinctUntilChanged(),
        filter((search) => search !== '' && search!.length > 2),
        tap((search) => this.charactersService.filterData(search!)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
