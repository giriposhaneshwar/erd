import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts.component';
import { RouterModule } from '@angular/router';
import { AlertsRoutes } from './alerts.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from 'app/core/widgster/directives.module';
import { TypeaheadModule  } from 'ngx-bootstrap';
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
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(AlertsRoutes)
  ],
  declarations: [
    AlertsComponent,
  ]
})
export class AlertsModule { }
