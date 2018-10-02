import { Routes } from '@angular/router';

import { MediaGridComponent}  from './grid/media-grid.component';
import { MediaListComponent}  from './list/media-list.component';

export const MediaRoutes: Routes = [{
  path: '',
  redirectTo: 'grid',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'grid',
    component: MediaGridComponent
  }, {
    path: 'list',
    component: MediaListComponent
  }]
}];
