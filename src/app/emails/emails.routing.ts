import { Routes } from '@angular/router';
import { InboxComponent } from './inbox.component';

export const EmailsRoutes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: InboxComponent
  }]
}];
