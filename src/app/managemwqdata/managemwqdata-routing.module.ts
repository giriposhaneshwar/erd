import { Routes } from '@angular/router';
import { ManagemwqdataComponent } from './managemwqdata.component';

export const ManagemwqdataRoutes: Routes = [{
  path: '',
  children: [{
      path: '',
      component: ManagemwqdataComponent
  }]
}];
