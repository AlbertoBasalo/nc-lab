import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BookingsComponent } from './routes/bookings/bookings.component';
import { SharedModule } from './shared/shared.module';

/** Root module with root component and main module imports*/
@NgModule({
  declarations: [AppComponent, BookingsComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
