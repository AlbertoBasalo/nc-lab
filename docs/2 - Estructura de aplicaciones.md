# 2 Estructura de aplicaciones

## 2.1 Módulos y components

### 2.1.1 Crear componentes

```bash
# Create header component
ng generate component header
# Alternative using short aliases
ng g c header
```

> Refactor: move the header stuff from app.component to header component

```html
<!-- header.component.html -->
<header>
  <nav>
    <ul>
      <a href="/" class="title">{{ title }}</a>
    </ul>
  </nav>
</header>
```

```html
<!-- app.component.html -->
<lab-header></lab-header>
<main>
  Angular Works!
  <router-outlet></router-outlet>
</main>
<footer>
  <a href="https://albertobasalo.dev" target="_blank">By Alberto Basalo</a>
</footer>
```

### 2.1.2 Crear módulos

```bash
# Create core module
ng generate module core
# Add footer component to core module
ng generate component core/footer
```

```typescript
// core.module.ts
@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule],
  exports: [FooterComponent],
})
export class CoreModule {}
```

```typescript
// app.module.ts
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

> Refactor: move the footer stuff from app.component to the footer component

```html
<!-- footer.component.html -->
<footer>
  <a href="https://albertobasalo.dev" target="_blank">By Alberto Basalo</a>
</footer>
```

```html
<!-- app.component.html -->
<lab-header></lab-header>
<main>
  Angular Works!
  <router-outlet></router-outlet>
</main>
<lab-footer></lab-footer>
```

### 2.1.3 Visibilidad de los componentes

> Refactor: move the header component to the core module

```typescript
// core.module.ts
@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [FooterComponent, HeaderComponent],
})
export class CoreModule {}
```

```typescript
// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
