import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {TabsModule } from 'ngx-bootstrap';

import { NgxChartsModule} from '@swimlane/ngx-charts';
import { DirectivesModule } from '../core/widgster/directives.module';

import { DashboardComponent } from './dashboard-v1/dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    TabsModule.forRoot(),
    DirectivesModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk'}),
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [ 
    DashboardComponent,
  ]
})

export class DashboardModule {}
