import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../core/widgster/directives.module';
import { DemoMaterialModule } from '../material-demo.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/userlist.component';

import { UsersRoutes } from './users.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DemoMaterialModule,
    DirectivesModule,
    RouterModule.forChild(UsersRoutes)
  ],
  declarations: [ 
    UserProfileComponent,
    UserListComponent
  ]
})

export class UsersModule {}
