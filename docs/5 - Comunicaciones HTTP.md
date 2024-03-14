# 5 Comunicaciones HTTP

Envío, recepción y manejo de datos asíncronos

## 5.1 Consumo de un API.

### 5.1.1 Lectura asíncrona de datos

```bash
npm i -D json-server@0.17.4 json-server-auth
npm i -D copyfiles
# package.json scripts
"api": "json-server-auth ../db/prod/d.json -r ../db/r.json",
"api:reset": "copyfiles -f ../db/reset/d.json ../db/prod && npm run api",
"api:seed": "copyfiles -f ../db/seed/d.json ../db/prod && npm run api",
npm run api
```

```typescript
//core module
import { HttpClientModule } from "@angular/common/http";
/** A module that holds one time used items(layout components, services...) */
@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
```

```typescript
// Home Page
@Component({
  selector: "lab-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  public activities: Activity[] = ACTIVITIES;
  constructor(http: HttpClient) {
    const url = "http://localhost:3000/activities";
    http.get<Activity[]>(url).subscribe((activities) => {
      this.activities = activities;
    });
  }
}
```

> To Do: async | version

```typescript
export class BookingsComponent {
  /**
   * Bookings Component constructor
   * @param route The router service injected by Angular
   * @param http The HttpClient service injected by Angular
   */
  constructor(route: ActivatedRoute, http: HttpClient) {
    // Get the activity slug from the router
    this.activitySlug = route.snapshot.params["slug"];
    // Get the activity from the server
    const url = `http://localhost:3000/activities?slug=${this.activitySlug}`;
    http.get<Activity[]>(url).subscribe((activities) => {
      const activity = activities[0] || NULL_ACTIVITY;
      this.activity = activity;
    });
  }
}
```

### 5.1.2 Envío asíncrono de cambios

```typescript
// Bookings Page
export class BookingsComponent {
  /**
   * Bookings Component constructor
   * @param route The router service injected by Angular
   * @param http The HttpClient service injected by Angular
   */
  constructor(route: ActivatedRoute, private http: HttpClient) {
    // Get the activity slug from the router
    this.activitySlug = route.snapshot.params["slug"];
    // Get the activity from the server
    const url = `http://localhost:3000/activities?slug=${this.activitySlug}`;
    http.get<Activity[]>(url).subscribe((activities) => {
      const activity = activities[0] || NULL_ACTIVITY;
      this.activity = activity;
    });
  }

  /** Event handler fired whe user clicks the booking button */
  public onBookClick() {
    console.log("Booking activity", this.totalParticipants);
    const newBooking: Booking = {
      id: 0,
      userId: 0,
      activityId: this.activity.id,
      date: new Date(),
      participants: this.newParticipants,
      payment: {
        method: "creditCard",
        amount: this.activity.price * this.newParticipants,
        status: "pending",
      },
    };
    this.http.post<Booking>("http://localhost:3000/bookings", newBooking).subscribe((booking: Booking) => {
      this.booked = true;
      this.bookedMessage = `Booked ${this.newParticipants} participants for ${booking.payment?.amount} dollars`;
      if (this.totalParticipants === this.activity.maxParticipants) {
        this.activity.status = "sold-out";
        return;
      }
      if (this.totalParticipants >= this.activity.minParticipants) {
        this.activity.status = "confirmed";
        return;
      }
    });
  }
}
```

```typescript
export class BookingsComponent {
/** Event handler fired whe user clicks the booking button */
  public onBookClick() {
    console.log('Booking activity', this.totalParticipants);
    const newBooking: Booking = {
      id: 0,
      userId: 0,
      activityId: this.activity.id,
      date: new Date(),
      participants: this.newParticipants,
      payment: {
        method: 'creditCard',
        amount: this.activity.price * this.newParticipants,
        status: 'pending',
      },
    };
    this.http.post<Booking>('http://localhost:3000/bookings', newBooking).subscribe((booking: Booking) => {
      this.booked = true;
      this.bookedMessage = `Booked ${this.newParticipants} participants for ${booking.payment?.amount} dollars`;
      this.updateActivityStatus();
    });
  }

  private updateActivityStatus() {
    let newStatus = this.activity.status;
    if (this.totalParticipants >= this.activity.minParticipants) {
      newStatus = 'confirmed';
    }
    if (this.totalParticipants >= this.activity.maxParticipants) {
      newStatus = 'sold-out';
    }
    if (newStatus !== this.activity.status) {
      this.activity.status = newStatus;
      const url = `http://localhost:3000/activities/${this.activity.id}`;
      this.http.put<Activity>(url, this.activity).subscribe((activity: Activity) => {
        console.log('Activity updated', activity);
      });
    }
  }
```

> To Do: pipe async...

## 5.2 Asincronismo y señales

### 5.2.1 Señales con los datos recibidos

```typescript
// Home Page
export default class HomePage {
  #http$ = inject(HttpClient);
  #apiUrl = "http://localhost:3000/activities";
  activities = signal<Activity[]>([]);

  constructor() {
    this.#http$.get<Activity[]>(this.#apiUrl).subscribe((activities) => {
      this.activities.set(activities);
    });
  }
}
```

### 5.2.2 Señales para enviar cambios

```typescript
// Bookings Page
export default class BookingsPage {
  #http$ = inject(HttpClient);
  #apiUrl = 'http://localhost:3000/activities';
  slug = input<string>();

  activity = signal<Activity>(NULL_ACTIVITY);

  constructor() {
    effect(() => this.#getActivityOnSlug(), { allowSignalWrites: true });
  }

 #getActivityOnSlug() {
    const activityUrl = `${this.#activitiesUrl}?slug=${this.slug()}`;
    this.#http$.get<Activity[]>(activityUrl).subscribe((activities) => {
      this.activity.set(activities[0] || NULL_ACTIVITY);
    });
 }
```

## 5.3 Operadores RxJS.

### 5.3.1 Tuberías funcionales

```typescript
export default class BookingsPage {
  #getActivityOnSlug() {
    const activityUrl = `${this.#activitiesUrl}?slug=${this.slug()}`;
    this.#http$
      .get<Activity[]>(activityUrl)
      .pipe(
        map((activities: Activity[]) => activities[0] || NULL_ACTIVITY),
        catchError((error) => {
          console.error("Error getting activity", error);
          return of(NULL_ACTIVITY);
        })
      )
      .subscribe((activity: Activity) => {
        this.activity.set(activity);
      });
  }
}
```

### 5.3.2 Interoperabilidad de señales y observables

```typescript
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

simpleSignal: Signal<string> = toSignal(of("Angular"), { initialValue: "" });
simpleObs: Observable<string> = toObservable(this.simpleSignal);
complexSignal: Signal<string> = toSignal(of(this.slug), { initialValue: "" });

// Original implementation
// activity = signal<Activity>(NULL_ACTIVITY);
// With effect
// constructor() {
//     const ALLOW_WRITE = { allowSignalWrites: true };
//     effect(() => this.#getActivityOnSlug(), ALLOW_WRITE);
// }

// Alternative implementation using toSignal and toObservable and switchMap

activity: Signal<Activity> = toSignal(
  toObservable(this.slug).pipe(
    switchMap((slug) =>
      this.#http$.get<Activity[]>(`${this.#activitiesUrl}?slug=${slug}`).pipe(
        map((activities) => activities[0] || NULL_ACTIVITY),
        catchError(() => of(NULL_ACTIVITY))
      )
    )
  ),
  { initialValue: NULL_ACTIVITY }
);
```
