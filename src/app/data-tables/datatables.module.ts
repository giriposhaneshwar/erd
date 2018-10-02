import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from '../core/widgster/directives.module';

import { EditingTableComponent}  from './table-editing/table-editing.component';
import { FilterTableComponent}  from './table-filter/table-filter.component';
import { PagingTableComponent}  from './table-paging/table-paging.component';
import { SortingTableComponent}  from './table-sorting/table-sorting.component';
import { PinningTableComponent}  from './table-pinning/table-pinning.component';
import { SelectionTableComponent}  from './table-selection/table-selection.component';

import { DataTablesRoutes } from './datatables.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatInputModule, 
    MatCardModule, 
    DirectivesModule,
    RouterModule.forChild(DataTablesRoutes)
  ],
  declarations: [ 
    EditingTableComponent,
    FilterTableComponent,
    PagingTableComponent,
    SortingTableComponent,
    PinningTableComponent,
    SelectionTableComponent,
  ]
})

export class DataTablesDemoModule {}
