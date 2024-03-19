import { TestBed } from '@angular/core/testing';

import { FavoritesStoreService } from './favorites-store.service';

describe('FavoritesStoreService', () => {
  let service: FavoritesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
