# 6 Escalado de aplicaciones

## 6.1 Patrón container/presenter

` ng g c routes/home/activities`

```typescript
export class ActivitiesComponent {
  @Input() public activities: Activity[] = [];
  @Input() public favorites: string[] = [];
  @Output() public toggleFavorite = new EventEmitter<string>();
}
```

```html
<article>
  <header>
    <h3>We have {{ activities.length }} activities</h3>
  </header>
  <main>
    <div *ngFor="let activity of activities">
      <span>
        <input
          type="checkbox"
          [checked]="favorites.includes(activity.slug)"
          (click)="toggleFavorite.emit(activity.slug)" />
      </span>
      <span>
        <a [routerLink]="['/', 'bookings', activity.slug]">{{ activity.name }}</a>
      </span>
      <span>at {{ activity.location }} on {{ activity.date | date }}</span>
    </div>
  </main>
</article>
```

`ng g c routes/home/footer`

```typescript
export class FooterComponent {
  @Input() public activitiesCount: number = 0;
  @Input() public favoritesCount: number = 0;
}
```

```html
<small>
  <span>
    Got
    <mark>{{ activitiesCount }}</mark>
    activities.
  </span>
  <span>
    You have selected
    <mark>{{ favoritesCount }}</mark>
    favorites.
  </span>
</small>
```

```html
<ng-container *ngIf="activities$ | async as activities">
  <lab-activities
    [activities]="activities"
    [favorites]="favorites"
    (toggleFavorite)="onToggleFavorite($event)"></lab-activities>
  <lab-footer [activitiesCount]="activities.length" [favoritesCount]="favorites.length"></lab-footer>
</ng-container>
```

```typescript
export class HomeComponent {
  /** The observable of array of activities from the API*/
  public activities$: Observable<Activity[]> = this.service.getActivities$();

  public favorites: string[] = [];
  /**
   * HomeComponent constructor
   * @param service HomeService service with data and logic for the HomeComponent
   */
  constructor(private service: HomeService) {}

  public onToggleFavorite(slug: string): void {
    const index = this.favorites.indexOf(slug);
    if (index === -1) {
      this.favorites.push(slug);
    } else {
      this.favorites.splice(index, 1);
    }
  }
}
```

## 6.2 Servicios e inyección de dependencias

`ng g s routes/home/home`

```typescript
@Injectable({
  providedIn: "root",
})
export class HomeService {
  private url: string = "http://localhost:3000/activities";

  /**
   * Service with data and logic for the HomeComponent
   * @param http HttpClient service to make requests to the API
   */
  constructor(private http: HttpClient) {}

  /**
   * Get activities from the API
   * @returns Observable of array of activities
   */
  public getActivities$(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.url);
  }
}
```

```typescript
export class HomeComponent {
  /** The observable of array of activities from the API*/
  public activities$: Observable<Activity[]> = this.service.getActivities$();

  /**
   * HomeComponent constructor
   * @param service HomeService service with data and logic for the HomeComponent
   */
  constructor(private service: HomeService) {}
}
```

## 6.3 Un almacén global basado en Subjects

`ng g s shared/state/favorites-store`

```typescript
@Injectable({
  providedIn: "root",
})
export class FavoritesStoreService {
  private state = new BehaviorSubject<string[]>([]);
  public state$ = this.state.asObservable();

  public setFavorites(favorites: string[]): void {
    this.state.next(favorites);
  }
}
```

```typescript
export class HomeComponent {
  /** The observable of array of activities from the API*/
  public activities$: Observable<Activity[]> = this.service.getActivities$();

  public favorites: string[] = [];
  /**
   * HomeComponent constructor
   * @param service HomeService service with data and logic for the HomeComponent
   * @param favoritesStore FavoritesStoreService service to manage the favorites state
   */
  constructor(private service: HomeService, private favoritesStore: FavoritesStoreService) {}

  public onToggleFavorite(slug: string): void {
    const index = this.favorites.indexOf(slug);
    if (index === -1) {
      this.favorites.push(slug);
    } else {
      this.favorites.splice(index, 1);
    }
    this.favoritesStore.setFavorites(this.favorites);
  }
}
```

```typescript
export class HeaderComponent {
  title = "Activity Bookings";
  favorites$ = this.favoritesStore.state$;

  constructor(private favoritesStore: FavoritesStoreService) {}
}
```

```html
<header>
  <nav>
    <ul>
      <a href="/" class="title">{{ title }}</a>
    </ul>
    <ul>
      <li>
        My favorites
        <sup>
          <mark>{{ (favorites$ | async)?.length || 0 }}</mark>
        </sup>
      </li>
      <li><a [routerLink]="['/', 'auth', 'login']">Login</a></li>
      <li><a [routerLink]="['/', 'auth', 'register']">Register</a></li>
    </ul>
  </nav>
</header>
```
