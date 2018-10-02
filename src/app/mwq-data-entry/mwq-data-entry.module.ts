import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MwqDataEntryRoutes } from './mwq-data-entry-routing.module';
import { MwqDataEntryComponent } from './mwq-data-entry.component';
import { RouterModule } from '@angular/router';
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
    RouterModule.forChild(MwqDataEntryRoutes)
  ],
  declarations: [MwqDataEntryComponent]
})
export class MwqDataEntryModule { }
