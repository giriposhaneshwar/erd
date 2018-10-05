import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsRoutes } from './incidents-routing.module';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from 'app/core/widgster/directives.module';
import { BuoysIncidentsComponent } from './buoys/buoys-incidents.component';
import { BloomsIncidentComponent } from './blooms/blooms-incidents.component';
import {TabsModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatCardModule, 
    DirectivesModule,
    TabsModule.forRoot(),
    RouterModule.forChild(IncidentsRoutes)
  ],
  declarations: [BuoysIncidentsComponent, BloomsIncidentComponent]
})
export class IncidentsModule { }
