import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockScreenComponent } from './lockscreen/lockscreen.component';

import { SessionRoutes } from './session.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule.forChild(SessionRoutes)
  ],
  declarations: [ 
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LockScreenComponent,
  ]
})

export class SessionModule {}
