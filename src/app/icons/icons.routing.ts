import { Routes } from '@angular/router';

import { FontAwesomeComponent}  from './font-awesome/font-awesome.component';
import { MaterialIconComponent}  from './material-icons/icons.component';
import { LineaComponent}  from './linea/linea.component';
import { SimpleLineIconsComponent}  from './simple-line-icons/simple-line-icons.component';

export const IconsRoutes: Routes = [{
  path: '',
  redirectTo: 'font-awesome',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'font-awesome',
    component: FontAwesomeComponent
  }, {
    path: 'material-icons',
    component: MaterialIconComponent
  }, {
    path: 'linea',
    component: LineaComponent
  }, {
    path: 'simple-line-icons',
    component: SimpleLineIconsComponent
  }]
}];
