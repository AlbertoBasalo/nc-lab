import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';

/** Array of route objects, linking a path wit a component or a lazy router module */
const routes: Routes = [
  {
    path: '',
    component: BookingsComponent,
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./routes/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'auth/register',
    loadChildren: () => import('./routes/auth/register/register.module').then((m) => m.RegisterModule),
  },
];

/** Root router module */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
