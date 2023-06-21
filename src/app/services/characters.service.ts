import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Character, DataResponse, Episode } from '../models/character.model';
import {
  BehaviorSubject,
  catchError,
  find,
  mergeMap,
  of,
  pluck,
  take,
  tap,
  withLatestFrom,
  Observable,
} from 'rxjs';
import { LocalStorageService } from './local-storage.service';

const QUERY = gql`
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private _episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this._episodesSubject.asObservable();

  private _charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this._charactersSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private localStorage: LocalStorageService
  ) {
    this.getDataAPI();
  }

  public getDetails(id: number): Observable<Character | undefined> {
    const result = this.characters$.pipe(
      mergeMap((characters: Character[]) => characters),
      find((character: Character) => character.id === id)
    );
    return result;
  }

  public filterData(valueToSearch: string): void {
    const QUERY_BY_NAME = gql`
      query ($name: String) {
        characters(filter: { name: $name }) {
          info {
            count
          }
          results {
            id
            name
            status
            species
            gender
            image
          }
        }
      }
    `;

    this.apollo
      .watchQuery<any>({
        query: QUERY_BY_NAME,
        variables: {
          name: valueToSearch,
        },
      })
      .valueChanges.pipe(
        take(1),
        pluck('data', 'characters'),
        tap((apiResponse) =>
          this._parseCharactersData([...apiResponse.results])
        ),
        catchError((error) => {
          console.log(error.message);
          this._charactersSubject.next([]);
          return of(error);
        })
      )
      .subscribe();
  }

  public getCharactersByPage(pageNum: number): void {
    const QUERY_BY_PAGE = gql`{
      characters(page: ${pageNum}) {
        results {
          id
          name,
          status,
          species,
          gender,
          image
        }
      }
    }`;

    this.apollo
      .watchQuery<any>({
        query: QUERY_BY_PAGE,
      })
      .valueChanges.pipe(
        take(1),
        pluck('data', 'characters'),
        withLatestFrom(this.characters$),
        tap(([apiResponse, characters]) => {
          this._parseCharactersData([...characters, ...apiResponse.results]);
        })
      )
      .subscribe();
  }

  public getDataAPI(): void {
    this.apollo
      .watchQuery<DataResponse>({ query: QUERY })
      .valueChanges.pipe(
        take(1),
        tap(({ data }) => {
          const { characters, episodes } = data;
          this._episodesSubject.next(episodes.results);
          this._parseCharactersData(characters.results);
        })
      )
      .subscribe();
  }

  private _parseCharactersData(characters: Character[]): void {
    const currentFavs = this.localStorage.getFavoritesCharacters();
    const newData = characters.map((character) => {
      const found = !!currentFavs.find(
        (fav: Character) => fav.id === character.id
      );
      return { ...character, isFavorite: found };
    });
    this._charactersSubject.next(newData);
  }
}
