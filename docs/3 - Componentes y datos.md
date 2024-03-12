# 3 Componentes y datos

## 3.1 Templates

- Use `{{ expression }}` or `[attribute]="expression"` to dynamically bind data
- Call functions in template for complex expressions (keep template simple)
- Use `| uppercase` (or any other _pipe_) to transform data presentation
- Use `(event)="method($event)"` to call methods in the controller

```html
<!-- footer.component.html -->
<footer>
  <nav>
    <span>
      <a [href]="author.homepage" target="_blank">© {{ getYear() }} {{ author.name }}</a>
    </span>
    <span>
      <button (click)="onAcceptClick()" class="secondary outline">Accept Cookies</button>
      <small>🍪 ✅ : {{ cookiesAccepted }}</small>
    </span>
  </nav>
</footer>
```

```typescript
// footer.component.ts
export class FooterComponent {
  author = {
    name: "Alberto Basalo",
    homepage: "https://albertobasalo.dev",
  };
  cookiesAccepted = false;

  getYear(): number {
    // ! Do not abuse (they are called on every change detection cycle)
    return new Date().getFullYear();
  }
  onAcceptClick(): void {
    console.log("Cookies accepted!");
    this.cookiesAccepted = true;
  }
}
```

## 3.2 Pipes y estilos

Carpeta `shared/domain` con modelos de datos Crear booking component para ver una activity y reservarla

```bash
ng g c bookings
```

```html
<!-- app.component.html -->
<lab-header></lab-header>
<main>
  <lab-bookings></lab-bookings>
  <router-outlet></router-outlet>
</main>
<lab-footer></lab-footer>
```

```typescript
// bookings.component.ts
export class BookingsComponent {
  activity: Activity = {
    name: "Paddle surf",
    location: "Lake Leman at Lausanne",
    price: 100,
    date: new Date(2025, 7, 15),
    minParticipants: 4,
    maxParticipants: 10,
    status: "published",
    id: 1,
    slug: "paddle-surf",
    duration: 2,
    userId: 1,
  };
  currentParticipants = 3;
}
```

```html
<!-- bookings.component.html -->
<article>
  <header>
    <h2>{{ activity.name }}</h2>
    <div [class]="activity.status">
      <span>{{ activity.location }}</span>
      <span>{{ activity.price | currency }}</span>
      <span>{{ activity.date | date }}</span>
      <span>{{ activity.status | uppercase }}</span>
    </div>
  </header>
  <main>
    <p>Participants: {{ currentParticipants }}</p>
  </main>
  <footer>
    <button>Book now!</button>
    <button>Cancel</button>
  </footer>
</article>
```

```css
.draft {
  color: violet;
  font-style: italic;
}
.published {
  color: limegreen;
}
.confirmed {
  color: green;
}
.sold-out {
  color: green;
  font-style: italic;
}
.done {
  color: orange;
  font-style: italic;
}
.cancelled {
  color: red;
  font-style: italic;
}
```

## 3.3 Entrada de datos

```html
<!-- bookings.component.html -->
<article>
  <header>
    <h2>{{ activity.name }}</h2>
    <div [class]="activity.status">
      <span>{{ activity.location }}</span>
      <span>{{ activity.price | currency }}</span>
      <span>{{ activity.date | date: 'dd-MMM-yyyy' }}</span>
      <span>{{ activity.status | uppercase }}</span>
    </div>
  </header>
  <main>
    <p>{{ activityRangeMessage }}</p>
    <p>Current Participants: {{ currentParticipants }}</p>
    <p>Total Participants: {{ totalParticipants }}</p>
  </main>
  <footer>
    <label for="newParticipants">How many participants want to book?</label>
    <input
      name="newParticipants"
      type="number"
      [max]="maxNewParticipants"
      min="0"
      [value]="newParticipants"
      (change)="onNewParticipantsChange($event)" />
    <button [disabled]="getDisableBookingButton()" (click)="onBookClick()">Book now!</button>
    <p>{{ bookedMessage }}</p>
  </footer>
</article>
```

```typescript
// bookings.component.ts
export class BookingsComponent {
  public activity: Activity = ACTIVITIES[3];

  public currentParticipants: number = 2;

  public newParticipants: number = 0;

  public totalParticipants: number = this.currentParticipants + this.newParticipants;

  public maxNewParticipants: number = this.activity.maxParticipants - this.currentParticipants;

  public bookedMessage: string = "";

  public getDisableBookingButton(): boolean {
    return this.newParticipants === 0;
  }

  onNewParticipantsChange(event: Event): void {
    const input: HTMLInputElement = event.target;
    const value = input.value;
    console.log("el input ha cambiado", value);
    this.newParticipants = parseInt(value, 10);
    this.totalParticipants = this.currentParticipants + this.newParticipants;
  }
  onBookClick(): void {
    this.bookedMessage = `Booked ${this.newParticipants} participants for ${
      this.activity.price * this.newParticipants
    } dollars`;
    if (this.totalParticipants === this.activity.maxParticipants) {
      this.activity.status = "sold-out";
      return;
    }
    if (this.totalParticipants >= this.activity.minParticipants) {
      this.activity.status = "confirmed";
      return;
    }
  }
}
```

## 3.4 Estructuras condicionales y repetitivas

```html
<footer>
  <div *ngIf="!booked">
    <label for="newParticipants">How many participants want to book?</label>
    <input
      name="newParticipants"
      type="number"
      [max]="maxNewParticipants"
      min="0"
      [value]="newParticipants"
      (change)="onNewParticipantsChange($event)" />
    <button [disabled]="getDisableBookingButton()" (click)="onBookClick()">Book now!</button>
  </div>
  <div *ngIf="booked">
    <p>{{ bookedMessage }}</p>
    <ul>
      <li *ngFor="let participant of newParticipantsData">🏃‍♂️ {{ getParticipantsMessage(participant) }}</li>
    </ul>
  </div>
</footer>
```

```typescript
export class BookingsComponent {
  public newParticipantsData: any[] = [];
  public booked: boolean = false;
}
```

```typescript
  public onNewParticipantsChange(event: any) {
    const input: HTMLInputElement = event.target;
    const value = input.value;
    console.log('el input ha cambiado', value);
    this.newParticipants = parseInt(value, 10);
    this.totalParticipants = this.currentParticipants + this.newParticipants;
    //this.disableBookingButton = this.newParticipants === 0;
    this.newParticipantsData = [];
    for (let i = 0; i < this.newParticipants; i++) {
      this.newParticipantsData.push({
        id: i + 1,
        name: 'Name_' + (i + 1),
        age: 3 * i + 7,
      });
    }
  }

  public onBookClick() {
    console.log('Reservar actividad', this.totalParticipants);
    this.booked = true;
    this.bookedMessage = `Booked ${this.newParticipants} participants for ${
      this.activity.price * this.newParticipants
    } dollars`;
    if (this.totalParticipants === this.activity.maxParticipants) {
      this.activity.status = 'sold-out';
      return;
    }
    if (this.totalParticipants >= this.activity.minParticipants) {
      this.activity.status = 'confirmed';
      return;
    }
  }
```

## 3.5 Custom pipe

```bash
ng g m shared
ng g p shared/pipes/participant
```

```typescript
// shared.module.ts
@NgModule({
  declarations: [ParticipantPipe],
  imports: [CommonModule],
  exports: [ParticipantPipe],
})
export class SharedModule {}

// app.module.ts
@NgModule({
  declarations: [AppComponent, BookingsComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```typescript
// participant.pipe.ts
import { Pipe, PipeTransform } from "@angular/core";
import { Participant } from "../domain/participant.type";

@Pipe({
  name: "participant",
})
export class ParticipantPipe implements PipeTransform {
  transform(value: Participant, ...args: unknown[]): unknown {
    return `Participant ${value.id} - ${value.name} - ${value.age} years old`;
  }
}
```

```html
<!-- bookings.component.html -->
<ul>
  <li *ngFor="let p of newParticipantsData">🏃‍♂️ {{ p | participant }}</li>
</ul>
```
