import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DirectivesModule } from '../core/widgster/directives.module';

import { BasicTablesComponent}  from './basic/basic-tables.component';
import { ResponsiveTablesComponent}  from './responsive/responsive-tables.component';

import { TablesRoutes } from './tables.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    DirectivesModule,
    RouterModule.forChild(TablesRoutes)
  ],
  declarations: [ 
    BasicTablesComponent,
    ResponsiveTablesComponent
  ]
})

export class TablesDemoModule {}
