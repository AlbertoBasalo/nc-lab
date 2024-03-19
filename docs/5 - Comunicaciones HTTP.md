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
@Component({
  selector: "lab-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private url: string = "http://localhost:3000/activities";

  public activities$: Observable<Activity[]> = this.http.get<Activity[]>(this.url);

  constructor(private http: HttpClient) {}
}
```

```html
<article *ngIf="activities$ | async as activities">
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

```typescript
export class BookingsComponent {
  /**
   * Component constructor
   * @param route The router service injected by Angular
   * @param http The HttpClient service injected by Angular
   */
  constructor(route: ActivatedRoute, private http: HttpClient) {
    // Get the activity slug from the router
    const activitySlug = route.snapshot.params["slug"];
    const slugUrl = `${this.url}?slug=${activitySlug}`;
    this.activity$ = this.http.get<Activity[]>(slugUrl).pipe(
      map((activities: Activity[]) => activities[0]),
      tap((activity: Activity) => (this.activity = activity))
    );
  }
}
```

```html
<article *ngIf="activity$ | async as activity">
  <header>
    <h2>{{ activity.name }}</h2>
    <div [class]="activity.status">
      <span>{{ activity.location }}</span>
      <span>{{ activity.price | currency }}</span>
      <span>{{ activity.date | date : "dd-MMM-yyyy" }}</span>
      <span>{{ activity.status | uppercase }}</span>
    </div>
  </header>
</article>
```

### 5.1.2 Envío asíncrono de cambios

```typescript
// Bookings Page
export class BookingsComponent {
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
      this.updateActivityStatus();
    });
  }

  private updateActivityStatus() {
    let newStatus = this.activity.status;
    if (this.totalParticipants >= this.activity.minParticipants) {
      newStatus = "confirmed";
    }
    if (this.totalParticipants >= this.activity.maxParticipants) {
      newStatus = "sold-out";
    }
    if (newStatus !== this.activity.status) {
      this.activity.status = newStatus;
      const url = `http://localhost:3000/activities/${this.activity.id}`;
      this.http.put<Activity>(url, this.activity).subscribe((activity: Activity) => {
        console.log("Activity updated", activity);
      });
    }
  }
}
```
