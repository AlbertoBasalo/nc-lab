# 6 Escalado de aplicaciones

## 6.1 Patrón container/presenter

` ng g c routes/home/activities`

```typescript
@Component({
  selector: "lab-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.css"],
})
export class ActivitiesComponent {
  @Input() public activities: Activity[] = [];
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
        <a [routerLink]="['/', 'bookings', activity.slug]">{{ activity.name }}</a>
      </span>
      <span>at {{ activity.location }} on {{ activity.date | date }}</span>
    </div>
  </main>
</article>
```

```html
<lab-activities *ngIf="activities$ | async as activities" [activities]="activities"></lab-activities>
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
