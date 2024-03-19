import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStoreService {
  private state = new BehaviorSubject<string[]>([]);
  public state$ = this.state.asObservable();

  public setFavorites(favorites: string[]): void {
    this.state.next(favorites);
  }
}
