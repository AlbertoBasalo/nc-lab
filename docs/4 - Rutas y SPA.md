# 4 Rutas y SPA

Páginas de contenido dinámico

## 4.1 Conceptos de enrutado y Single Page Applications.

### 4.1.1 Configuración y router outlet

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: "",
    component: BookingsComponent,
  },
];
```

```html
<lab-header></lab-header>
<main>
  <!-- <lab-bookings></lab-bookings> -->
  <router-outlet></router-outlet>
</main>
<lab-footer></lab-footer>
```

```css
main {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
```

```bash
ng g m routes/auth/login --routing
ng g c routes/auth/login
```

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: "auth/login",
    loadChildren: () => import("./routes/auth/login/login.module").then((m) => m.LoginModule),
  },
];
```

```typescript
// login-routing.module.ts
const routes: Routes = [{ path: "", component: LoginComponent }];
```

### 4.1.2 Router link

`ng g m routes/auth/register --route=auth/register -m=app`

```typescript
// HeaderComponent [routerLink] / /login
@Component({
  selector: "lab-header",
  imports: [RouterLink],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  title = "Activity Bookings";
}
```

```html
<header>
  <nav>
    <a [routerLink]="['/']">
      <strong>{{ title }}</strong>
    </a>
    <a [routerLink]="['/','auth', 'login']">Login</a>
    <a [routerLink]="['/','auth', 'register']">Register</a>
  </nav>
</header>
```

```typescript
    // core.module.ts
  imports: [CommonModule, RouterModule],
```

```typescript
// login.component.ts

@Component({
  selector: "lab-login",
  imports: [RouterLink],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {}
```

```html
<article>
  <header>
    <h2>Login</h2>
  </header>
  <main>
    <form>
      <label for="email">
        <span>Email</span>
        <input id="email" type="email" />
      </label>
      <label for="password">
        <span>Password</span>
        <input id="password" type="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  </main>
  <footer>
    <a [routerLink]="['/auth', 'register']">Register if don't have an account</a>
  </footer>
</article>
```

```typescript
@Component({
  imports: [RouterLink],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPage {}
```

```html
<article>
  <header>
    <h2>Register</h2>
  </header>
  <main>
    <form>
      <label for="username">
        <span>Username</span>
        <input id="username" type="text" />
      </label>
      <label for="email">
        <span>Email</span>
        <input id="email" type="email" />
      </label>
      <label for="password">
        <span>Password</span>
        <input id="password" type="password" />
      </label>
      <label for="confirm">
        <span>Confirm Password</span>
        <input id="confirm" type="password" />
      </label>
      <label for="terms">
        <span>Accept the terms and conditions</span>
        <input id="terms" type="checkbox" />
      </label>
      <button type="submit">Login</button>
    </form>
  </main>
  <footer>
    <a [routerLink]="['/auth', 'login']">Login if already have an account</a>
  </footer>
</article>
```

## 4.2 Parámetros en las rutas, observables en los componentes.

### 4.2.1 Configuración y envío

activities.data.ts

```typescript
// activities array TypeScript constant
export const ACTIVITIES: Activity[] = [
  {
    name: 'Paddle surf',
    location: 'Lake Leman at Lausanne',
    price: 125,
    date: new Date(2023, 7, 15),
    minParticipants: 5,
    maxParticipants: 9,
    status: 'done',
    id: 1,
    slug: 'paddle-surf-lake-leman-at-lausanne',
    duration: 2,
    userId: 1,
  },...
```

`ng g m routes/home --route=home -m=app`

```typescript
// config with routed params
export const routes: Routes = [
  {
    home',
    loadChildren: () => import('./routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: "bookings/:slug",
    loadChildren: () => import('./routes/bookings/bookings.module').then((m) => m.BookingsModule),
  },
];
```

```typescript
// homePage activity list
@Component({
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  activities = ACTIVITIES;
}
```

```html
<article>
  <header>
    <h2>Activities</h2>
  </header>
  <main>
    <div *ngFor="let activity of activities">
      <span>
        <a [routerLink]="['/' , 'bookings' , activity.slug]">{{ activity.name }}</a>
      </span>
      <span>{{ activity.location }}</span>
      <span>{{ activity.price | currency }}</span>
      <span>{{ activity.date | date : "dd-MMM-yyyy" }}</span>
    </div>
  </main>
</article>
```

> To Do: classic syntax

### 4.2.2 Recepción de parámetros

```typescript
class BookingComponent {
  slug = "";

  activity = NULL_ACTIVITY;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.slug = params.slug;
      this.activity = ACTIVITIES.find((activity) => activity.slug === this.slug);
    });
  }
}
```

## 4.3 SEO y Server Side Rendering.

### 4.3.1 SPA y navegación local y offline

```shell
// navegación local desconectada
# dev mode
npm start
# chunks
// primero server, después browser
```

### 4.3.2 Indexación de contenido SSR

> ToDo...

```bash

# build and node serve
npm run build
```

### 4.3.3 SEO y metadatos

```typescript
export default class BookingsPage {
  constructor(title: Title, meta: Meta) {
    const activity = this.activity;
    title.setTitle(activity.name);
    const description = `${activity.name} in ${activity.location} on ${activity.date} for ${activity.price}`;
    meta.updateTag({ name: "description", content: description });
  }
}
```

```typescript
export default class HomePage {
  constructor(title: Title, meta: Meta) {
    title.setTitle("Activities to book");
    meta.updateTag({ name: "description", content: "Activities to book" });
  }
}
```
