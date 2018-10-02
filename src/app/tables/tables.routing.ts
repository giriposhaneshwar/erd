import { Routes } from '@angular/router';

import { BasicTablesComponent}  from './basic/basic-tables.component';
import { ResponsiveTablesComponent}  from './responsive/responsive-tables.component';

export const TablesRoutes: Routes = [{
  path: '',
  redirectTo: 'basic-tables',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'basic-tables',
    component: BasicTablesComponent
  }, {
    path: 'responsive-tables',
    component: ResponsiveTablesComponent
  }]
}];
