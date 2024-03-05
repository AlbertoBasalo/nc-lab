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

````html
Carpeta `shared/domain` con modelos de datos Crear booking component para ver una activity y reservarla ```bash ng g c
bookings
````

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
      <span>{{ activity.date | date }}</span>
      <span>{{ activity.status | uppercase }}</span>
    </div>
  </header>
  <main>
    <h4>Participants</h4>
    <div>Already Participants: {{ alreadyParticipants }}</div>
    <div>New participants: {{ newParticipants }}</div>
    <div>Total participants: {{ totalParticipants() }}</div>
  </main>
  <footer>
    <h4>New Bookings</h4>
    <label for="newParticipants">How many participants want to book?</label>
    <input type="number" [value]="newParticipants" (change)="onNewParticipantsChange($event)" />
    <button [disabled]="booked || newParticipants === 0" (click)="onBookClick()">Book now!</button>
  </footer>
</article>
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
  alreadyParticipants = 3;
  newParticipants = 0;
  totalParticipants = () => this.alreadyParticipants + this.newParticipants;

  booked = false;

  onNewParticipantsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const participants: number = parseInt(input.value);
    this.newParticipants = participants;
    console.log("New participants:", participants);
  }
  onBookClick(): void {
    console.log("Booking for", this.newParticipants, "participants");
    this.booked = true;
  }
}
```

## 3.4 Estructuras condicionales y repetitivas

```html
<footer>
  <h4>New Bookings</h4>
  <section *ngIf="remainingPlaces() > 0">
    <label for="newParticipants">How many participants want to book?</label>
    <input type="number" [value]="newParticipants" (change)="onNewParticipantsChange($event)" />
  </section>
  <section *ngIf="remainingPlaces() === 0">
    <p>Sorry, no more places available</p>
  </section>
  <button [disabled]="booked || newParticipants === 0" (click)="onBookClick()">Book now!</button>
</footer>
```

```typescript
remainingPlaces = () => this.activity.maxParticipants - this.totalParticipants();
```

```html
<div>
  <span *ngFor="let p of participants">🏃‍♂️ {{ p.id }}</span>
</div>
```

```typescript
onNewParticipantsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const participants: number = parseInt(input.value);
    this.newParticipants = participants;
    this.participants = [];
    for (let i = 1; i <= this.totalParticipants(); i++) {
      this.participants.push({ id: i });
    }
    console.log('New participants:', participants);
  }
```
