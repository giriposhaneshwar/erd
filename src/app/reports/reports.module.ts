import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutes } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule } from '@angular/material';
import { DirectivesModule } from 'app/core/widgster/directives.module';
import { CompareParamsComponent } from './compare-params/compare-params.component';
import { SitesPerformanceComponent } from './sites-performance/sites-performance.component';
import { AnalyticsComponent } from './analytics/analytics.component';


@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatCardModule, 
    DirectivesModule,
    RouterModule.forChild(ReportRoutes)
  ],
  declarations: [ReportsComponent,  AnalyticsComponent, CompareParamsComponent, SitesPerformanceComponent]
})
export class ReportsModule { }
