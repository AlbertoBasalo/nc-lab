import { Component } from '@angular/core';
import { FavoritesStoreService } from 'src/app/shared/state/favorites-store.service';

@Component({
  selector: 'lab-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Activity Bookings';
  favorites$ = this.favoritesStore.state$;

  constructor(private favoritesStore: FavoritesStoreService) {}
}
