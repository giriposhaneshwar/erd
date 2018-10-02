import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsRoutes } from './incidents-routing.module';
import { RouterModule } from '@angular/router';
import { IncidentsComponent } from './incidents.component';
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
    RouterModule.forChild(IncidentsRoutes)
  ],
  declarations: [IncidentsComponent]
})
export class IncidentsModule { }
