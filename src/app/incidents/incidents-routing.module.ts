import { Routes } from '@angular/router';
import { BuoysIncidentsComponent } from './buoys/buoys-incidents.component';
import { BloomsIncidentComponent } from './blooms/blooms-incidents.component';

export const IncidentsRoutes: Routes = [{
  path: '',
  redirectTo: 'buoys-incidents',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'buoys-incidents',
    component: BuoysIncidentsComponent
  }, {
    path: 'blooms-incidents',
    component: BloomsIncidentComponent
  }]
}];
