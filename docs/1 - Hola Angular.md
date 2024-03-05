# 1 Hola Angular

Introducción al desarrollo de aplicaciones web con Angular moderno.

## 1.1 Instalación del Angular CLI y generación de una aplicación.

### 1.1.1 Crear un proyecto nuevo: Activity Bookings

```bash
# Ensure node version
# https://nodejs.org/en/download
# https://angular.io/guide/versions

node -v
# Global install on your machine
npm i -g @angular/cli@15.2.2

# Modern app generation
ng new ActivityBookings --prefix=lab --routing --style=css

# Or run with npx and options with aliases (- instead of --)
npx @angular/cli@15.2.2 ng new ActivityBookings -p=lab --route --style=css

# Default mode with interactive prompts
ng new UnProyectoNuevo
# Minimalistic option
ng new UnProyectoNuevo --minimal
```

### 1.1.2 Árbol de ficheros y carpetas

```
.
├── .editorconfig
├── .gitignore
├── .vscode
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── angular.json
├── package.json
├── README.md
├── src
│   ├── index.html
│   └── styles.css
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## 1.2 Comandos básicos para depurar y ejecutar aplicaciones.

### 1.2.1 Compilar y servir en modo producción

```bash
# Compile
ng build
# Serve from a static folder
"http-server": "npx http-server dist/activity-bookings/browser -c-1",
```

### 1.2.2 Ejecutar y actualizar aplicación en modo desarrollo

```bash
# npm start
ng serve
# Common options
ng server --open --force-esbuild
# Configuring browser for dev
"chrome": "start chrome -incognito -auto-open-devtools-for-tabs <http://localhost:4200>",
"start": "npm run chrome && ng serve ",
```

`app.component.html`

```html
<header>
  <nav>
    <ul>
      <a href="/" class="title">{{ title }}</a>
    </ul>
  </nav>
</header>
<main>
  Angular Works!
  <router-outlet></router-outlet>
</main>
<footer>
  <a href="https://albertobasalo.dev" target="_blank">By Alberto Basalo</a>
</footer>
```

`app.component.css`

```css
.title {
  font-size: 1.2rem;
  font-weight: bold;
}
```

`app.component.ts`

````typescript
export class AppComponent {
  title = 'Activity Bookings';
}
``

```bash
# use picocss to style the app
npm install @picocss/pico
# add to angular.json
"node_modules/@picocss/pico/css/pico.min.css",
```

`styles.css`

```css
body {
  padding: 1rem;
}
span {
  margin-right: 0.5rem;
}
```

## 1.3 Configuración del espacio de trabajo, editor y herramientas recomendadas.

### 1.3.1 Angular Essentials y DotFiles

https://github.com/AlbertoBasalo/dotfiles

### 1.3.2 EsLint y Prettier

```bash
ng add @angular-eslint/schematics
npm i prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier -D
```

Prettier config

```json
{
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "printWidth": 120
}
```

EsLint config

```json
{
  "root": true,
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended"
      ],
      "rules": {
        "prettier/prettier": "warn",
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "lab",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "lab",
            "style": "kebab-case"
          }
        ]
      }
    },
    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended", "plugin:@angular-eslint/template/accessibility"],
      "rules": {}
    }
  ]
}
```
````
