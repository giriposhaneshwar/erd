import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard-v1/dashboard.component';

export const DashboardRoutes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: DashboardComponent
  }]
}];
