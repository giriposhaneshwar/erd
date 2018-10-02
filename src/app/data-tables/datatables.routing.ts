import { Routes } from '@angular/router';

import { EditingTableComponent}  from './table-editing/table-editing.component';
import { FilterTableComponent}  from './table-filter/table-filter.component';
import { PagingTableComponent}  from './table-paging/table-paging.component';
import { SortingTableComponent}  from './table-sorting/table-sorting.component';
import { PinningTableComponent}  from './table-pinning/table-pinning.component';
import { SelectionTableComponent}  from './table-selection/table-selection.component';

export const DataTablesRoutes: Routes = [{
  path: '',
  redirectTo: 'editing',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'editing',
    component: EditingTableComponent
  }, {
    path: 'filter',
    component: FilterTableComponent
  }, {
    path: 'paging',
    component: PagingTableComponent
  }, {
    path: 'sorting',
    component: SortingTableComponent
  }, {
    path: 'pinning',
    component: PinningTableComponent
  }, {
    path: 'selection',
    component: SelectionTableComponent
  }]
}];
