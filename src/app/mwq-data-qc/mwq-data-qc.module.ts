import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MwqDataQcRoutes } from './mwq-data-qc-routing.module';
import { RouterModule } from '@angular/router';
import { MwqDataQcComponent } from './mwq-data-qc.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from 'app/core/widgster/directives.module';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatCardModule, 
    DirectivesModule,
    RouterModule.forChild(MwqDataQcRoutes)
  ],
  declarations: [MwqDataQcComponent ]
})
export class MwqDataQcModule { }
