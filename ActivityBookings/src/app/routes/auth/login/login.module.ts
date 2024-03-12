import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

/** The login module, with the routing and components */
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule],
})
export class LoginModule {}
