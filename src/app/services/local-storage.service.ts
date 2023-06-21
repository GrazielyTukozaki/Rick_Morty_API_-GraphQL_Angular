import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public MY_FAVORITES = 'myFavorites';
  private charactersFavSubject = new BehaviorSubject<Character[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor() {
    this.initialStorage();
  }

  private initialStorage(): void {
    const currents = localStorage.getItem(this.MY_FAVORITES);
    if (!currents) {
      localStorage.setItem(this.MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesCharacters();
  }

  clearStorage() {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Error cleaning localstorage', error);
    }
  }

  getFavoritesCharacters(): any {
    try {
      const charactersFav = JSON.parse(
        localStorage.getItem(this.MY_FAVORITES) ?? ''
      );
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      console.warn('Error getting favorites from localstorage', error);
    }
  }

  addOrRemoveFavorite(character: Character): void {
    const { id } = character;
    const currentFav = this.getFavoritesCharacters();
    const found = !!currentFav.find((fav: Character) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentFav = this.getFavoritesCharacters();
      localStorage.setItem(
        this.MY_FAVORITES,
        JSON.stringify([...currentFav, character])
      );
      this.charactersFavSubject.next([...currentFav, character]);
      alert(`${character.name} added to favorite`);
    } catch (error) {
      console.warn('Error saving localstorage', error);
      alert(`Error saving localstorage ${error}`);
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentFav = this.getFavoritesCharacters();
      const characters = currentFav.filter((char: Character) => char.id !== id);
      localStorage.setItem(this.MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([...characters]);
      alert(`Removed from favorites`);
    } catch (error) {
      console.warn('Error removing localstorage', error);
      alert(`Error removing localstorage ${error}`);
    }
  }
}
