import { Routes } from '@angular/router';

import { ChartComponent}  from './ng2-charts/chart.component';
import { BarChartComponent}  from './bar-charts/bar-chart.component';
import { PieChartDemoComponent}  from './pie-charts/pie-chart.component';
import { LineChartDemoComponent}  from './line-charts/line-chart.component';
import { MixedChartDemoComponent}  from './mixed-charts/mixed-chart.component';

export const ChartsRoutes: Routes = [{
  path: '',
  redirectTo: 'ng2-charts',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'ng2-charts',
    component: ChartComponent
  }, {
    path: 'bar-charts',
    component: BarChartComponent
  }, {
    path: 'pie-charts',
    component: PieChartDemoComponent
  }, {
    path: 'line-charts',
    component: LineChartDemoComponent
  }, {
    path: 'mixed-charts',
    component: MixedChartDemoComponent
  }]
}];
