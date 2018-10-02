import { Routes } from '@angular/router';
import { IncidentsComponent } from './incidents.component';

export const IncidentsRoutes: Routes = [{
  path: '',
  children: [{
      path: '',
      component: IncidentsComponent
  }]
}];