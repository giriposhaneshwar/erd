import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { DirectivesModule } from '../core/widgster/directives.module';

import { ChartComponent}  from './ng2-charts/chart.component';
import { BarChartComponent}  from './bar-charts/bar-chart.component';
import { PieChartDemoComponent}  from './pie-charts/pie-chart.component';
import { LineChartDemoComponent}  from './line-charts/line-chart.component';
import { MixedChartDemoComponent}  from './mixed-charts/mixed-chart.component';

import { ChartsRoutes } from './charts.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    NgxChartsModule,
    ChartsModule,
    DirectivesModule,
    RouterModule.forChild(ChartsRoutes)
  ],
  declarations: [ 
    ChartComponent,
    BarChartComponent,
    PieChartDemoComponent,
    LineChartDemoComponent,
    MixedChartDemoComponent
  ]
})

export class ChartsDemoModule {}
